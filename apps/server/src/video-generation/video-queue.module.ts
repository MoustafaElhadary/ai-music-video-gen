import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { ReplicateService } from '@server/replicate/replicate.service';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { SupabaseService } from '@server/supabase/supabase.service';
import { VIDEO_QUEUE } from '../core/constants';

import { VideoQueueConsumer } from './video-queue.consumer';
import { AudioService } from './services/audio.service';
import { ImageService } from './services/image.service';
import { SubtitleService } from './services/subtitle.service';
import { UploadService } from './services/upload.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('UPSTASH_REDIS_HOST'),
          port: parseInt(configService.get('UPSTASH_REDIS_PORT') ?? '6379', 10),
          password: configService.get('UPSTASH_REDIS_PASSWORD'),
          tls: {},
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: VIDEO_QUEUE }),
    SunoApiModule.register(),
  ],
  exports: [BullModule],
  providers: [
    VideoQueueConsumer,
    PrismaService,
    GenerationRequestService,
    SupabaseService,
    ReplicateService,
    AudioService,
    ImageService,
    SubtitleService,
    UploadService,
  ],
})
export class VideoQueueModule {}
