import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from './trpc.router';
import { BookRouter } from '@server/book/book.router';
import { BookService } from '@server/book/book.service';
import { PrismaService } from '@server/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TrpcService, TrpcRouter, PrismaService, BookService, BookRouter],
})
export class TrpcModule {}
