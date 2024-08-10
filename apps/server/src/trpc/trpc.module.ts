import { Module } from '@nestjs/common';
import { BookModule } from '@server/book/book.module';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from './trpc.router';
import { GenerationRequestModule } from '@server/generation-request/generation-request.module';
import { StripeModule } from '@server/stripe/stripe.module';

@Module({
  imports: [BookModule, GenerationRequestModule, StripeModule],
  providers: [TrpcService, TrpcRouter, PrismaService],
  exports: [TrpcService],
})
export class TrpcModule {}
