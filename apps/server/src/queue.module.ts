import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TRANSCODE_QUEUE } from './core/constants';
import { TranscodeConsumer } from './video/transcode.consumer';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure you have the ConfigModule set up correctly
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
      name: TRANSCODE_QUEUE,
    }),
  ],
  exports: [BullModule],
  providers: [TranscodeConsumer],
})
export class QueueModule {}
