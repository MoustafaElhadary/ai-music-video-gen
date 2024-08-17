import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { StripeModule } from './stripe/stripe.module';
import { SunoApiModule } from './suno-api/suno-api.module';
import { TrpcModule } from './trpc/trpc.module';
import { VideoQueueModule } from './video-generation/video-queue.module';
import { GenerationRequestModule } from './generation-request/generation-request.module';
import { StripeController } from './stripe/stripe.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TrpcModule,
    VideoQueueModule,
    SunoApiModule.register(),
    BookModule,
    GenerationRequestModule,
    StripeModule,
  ],
  controllers: [AppController, StripeController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
