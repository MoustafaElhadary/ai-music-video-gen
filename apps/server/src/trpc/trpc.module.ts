import { Module } from '@nestjs/common';
import { BookRouter } from '@server/book/book.router';
import { BookService } from '@server/book/book.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { TrpcService } from '@server/trpc/trpc.service';
import { VideoQueueModule } from '@server/video/video-queue.module';
import { TrpcRouter } from './trpc.router';
import { BookModule } from '@server/book/book.module';

@Module({
  imports: [VideoQueueModule, SunoApiModule.register(), BookModule],
  providers: [TrpcService, TrpcRouter, PrismaService],
})
export class TrpcModule {}
