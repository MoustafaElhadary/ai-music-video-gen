import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { GenerationRequestService } from '../generation-request/generation-request.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private generationRequestService: GenerationRequestService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      {
        apiVersion: '2024-04-10',
      },
    );
  }

  // Input validation schema
  createPaymentIntentSchema = z.object({
    priceId: z.string(),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
    metadata: z.record(z.string()).optional(),
  });

  async createPaymentIntent(
    input: z.infer<typeof this.createPaymentIntentSchema>,
  ) {
    const { priceId, successUrl, cancelUrl, metadata } =
      this.createPaymentIntentSchema.parse(input);

    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        automatic_tax: { enabled: true },
        metadata,
        billing_address_collection: 'required',
        phone_number_collection: { enabled: true },
      });

      return { url: session.url };
    } catch (err) {
      if (err instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message,
        });
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  // Input validation schema for retrieveSession
  retrieveSessionSchema = z.object({
    sessionId: z.string(),
  });

  async retrieveSession(input: z.infer<typeof this.retrieveSessionSchema>) {
    const { sessionId } = this.retrieveSessionSchema.parse(input);

    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      return {
        status: session.status,
        customer_email: session.customer_details?.email,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message,
        });
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unknown error occurred',
        });
      }
    }
  }

  async handleSuccessfulPayment(session: Stripe.Checkout.Session) {
    const generationRequestId = session.metadata?.generationRequestId;

    if (generationRequestId) {
      await this.generationRequestService.handleSuccessfulPayment(
        generationRequestId,
      );
    }
  }
}
