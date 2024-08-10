import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeRouter } from './stripe.router';
import { TrpcService } from '@server/trpc/trpc.service';

@Module({
  providers: [StripeService, StripeRouter, TrpcService],
  exports: [StripeService, StripeRouter],
})
export class StripeModule {}
