import { Module } from '@nestjs/common';
import { SunoApiModule } from '@server/suno-api/suno-api.module';
import { VideoQueueModule } from '@server/video/video-queue.module';
import { BookRouter } from './book.router';
import { BookService } from './book.service';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';

@Module({
  imports: [VideoQueueModule, SunoApiModule.register()],
  providers: [BookService, BookRouter, PrismaService, TrpcService],
  exports: [BookService, BookRouter],
})
export class BookModule {}
