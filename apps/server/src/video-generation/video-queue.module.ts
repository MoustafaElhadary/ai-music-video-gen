import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { VIDEO_QUEUE } from '@server/core/constants';
import { GenerationRequestModule } from '@server/generation-request/generation-request.module';
import { StripeModule } from '@server/stripe/stripe.module';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { AudioService } from './services/audio.service';
import { ImageService } from './services/image.service';
import { SubtitleService } from './services/subtitle.service';
import { UploadService } from './services/upload.service';
import { VideoQueueConsumer } from './video-queue.consumer';

@Module({
  imports: [
    BullModule.registerQueue({ name: VIDEO_QUEUE }),
    SunoApiModule.register(),
    GenerationRequestModule,
    StripeModule,
  ],
  providers: [
    VideoQueueConsumer,
    AudioService,
    ImageService,
    SubtitleService,
    UploadService,
  ],
  exports: [BullModule],
})
export class VideoQueueModule {}
