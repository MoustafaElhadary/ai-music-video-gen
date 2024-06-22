import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRouter } from './book.router';

@Module({
  imports: [],
  controllers: [],
  providers: [BookService, BookRouter],
})
export class BookModule {}
