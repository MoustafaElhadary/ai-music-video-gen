import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '@server/prisma/prisma.service';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { VIDEO_QUEUE } from '../core/constants';
import { VideoQueueConsumer } from './video-queue.consumer';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('UPSTASH_REDIS_HOST'),
          port: parseInt(configService.get('UPSTASH_REDIS_PORT') ?? '6379', 10),
          password: configService.get('UPSTASH_REDIS_PASSWORD'),
          tls: {},
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: VIDEO_QUEUE,
    }),
    SunoApiModule.register(),
  ],
  exports: [BullModule],
  providers: [VideoQueueConsumer, PrismaService, GenerationRequestService],
})
export class VideoQueueModule {}
