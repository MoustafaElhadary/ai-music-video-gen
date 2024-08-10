/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
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
}
