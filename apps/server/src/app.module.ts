import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { GenerationRequestModule } from './generation-request/generation-request.module';
import { SharedModule } from './shared/shared.module';
import { StripeModule } from './stripe/stripe.module';
import { SunoApiModule } from './suno-api/suno-api.module';
import { TrpcModule } from './trpc/trpc.module';
import { VideoQueueModule } from './video-generation/video-queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    SharedModule,
    TrpcModule,
    VideoQueueModule,
    SunoApiModule.register(),
    BookModule,
    GenerationRequestModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
