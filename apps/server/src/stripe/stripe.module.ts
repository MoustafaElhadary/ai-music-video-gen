import { Module, forwardRef } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeRouter } from './stripe.router';
import { StripeController } from './stripe.controller';
import { GenerationRequestModule } from '@server/generation-request/generation-request.module';

@Module({
  imports: [forwardRef(() => GenerationRequestModule)],
  providers: [StripeService, StripeRouter],
  exports: [StripeService, StripeRouter],
  controllers: [StripeController],
})
export class StripeModule {}
