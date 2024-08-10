/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { StripeService } from './stripe.service';

@Injectable()
export class StripeRouter {
  constructor(
    private trpc: TrpcService,
    private stripeService: StripeService,
  ) {}

  router = this.trpc.router({
    createPaymentIntent: this.trpc.protectedProcedure
      .input(this.stripeService.createPaymentIntentSchema)
      .mutation(async ({ input }) => {
        return this.stripeService.createPaymentIntent(input);
      }),

    retrieveSession: this.trpc.protectedProcedure
      .input(this.stripeService.retrieveSessionSchema)
      .query(async ({ input }) => {
        return this.stripeService.retrieveSession(input);
      }),
  });
}
