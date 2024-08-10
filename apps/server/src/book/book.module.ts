import { Module } from '@nestjs/common';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { VideoQueueModule } from '@server/video/video-queue.module';
import { BookRouter } from './book.router';
import { BookService } from './book.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { GenerationRequestRouter } from '@server/generation-request/generation-request.router';
import { StripeRouter } from '@server/stripe/stripe.router';
import { StripeService } from '@server/stripe/stripe.service';

@Module({
  imports: [VideoQueueModule, SunoApiModule.register()],
  providers: [
    BookService,
    BookRouter,
    GenerationRequestService,
    GenerationRequestRouter,
    StripeService,
    StripeRouter,
    PrismaService,
    TrpcService,
  ],
  exports: [
    BookService,
    BookRouter,
    GenerationRequestService,
    GenerationRequestRouter,
    StripeService,
    StripeRouter,
  ],
})
export class BookModule {}
