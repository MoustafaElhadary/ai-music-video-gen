import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { Request, Response } from 'express';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2024-04-10',
      },
    );
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    )!;

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(err);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.handleSuccessfulPayment(session);
    }

    res.json({ received: true });
  }

  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const generationRequestId = session.metadata?.generationRequestId;

    console.log({ generationRequestId, metadata: session.metadata });
    if (generationRequestId) {
      await this.prisma.generationRequest.update({
        where: { id: generationRequestId },
        data: { status: 'PAID' },
      });
    }
  }
}
