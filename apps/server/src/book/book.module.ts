import { Module } from '@nestjs/common';
import { QueueModule } from '@server/queue.module';
import { TranscodeConsumer } from '@server/video/transcode.consumer';
import { BookRouter } from './book.router';
import { BookService } from './book.service';

@Module({
  imports: [QueueModule],
  controllers: [],
  providers: [BookService, BookRouter, TranscodeConsumer],
})
export class BookModule {}
