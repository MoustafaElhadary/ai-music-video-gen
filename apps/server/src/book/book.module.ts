import { Module } from '@nestjs/common';
import { PrismaService } from '@server/prisma/prisma.service';
import { TrpcService } from '@server/trpc/trpc.service';
import { BookRouter } from './book.router';
import { BookService } from './book.service';

@Module({
  imports: [],
  providers: [BookService, BookRouter, PrismaService, TrpcService],
  exports: [BookService, BookRouter],
})
export class BookModule {}
