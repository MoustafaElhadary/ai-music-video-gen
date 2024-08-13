import { Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private stripeService: StripeService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2024-04-10',
      },
    );
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    )!;

    let event: Stripe.Event;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      event = this.stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(err);
      res.status(400).send(`Webhook Error: ${(err as Error).message}`);
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.handleSuccessfulPayment(session);
    }

    res.json({ received: true });
  }

  private async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const generationRequestId = session.metadata?.generationRequestId;

    console.log({ generationRequestId, metadata: session.metadata });
    if (generationRequestId) {
      await this.stripeService.handleSuccessfulPayment(session);
    }
  }
}
