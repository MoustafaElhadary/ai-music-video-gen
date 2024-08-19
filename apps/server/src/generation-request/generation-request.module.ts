import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { VIDEO_QUEUE } from '@server/core/constants';
import { StripeModule } from '@server/stripe/stripe.module';
import { GenerationRequestRouter } from './generation-request.router';
import { GenerationRequestService } from './generation-request.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: VIDEO_QUEUE,
    }),
    forwardRef(() => StripeModule),
  ],
  providers: [GenerationRequestService, GenerationRequestRouter],
  exports: [GenerationRequestService, GenerationRequestRouter],
})
export class GenerationRequestModule {}
