import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import { BookService } from './book.service';

@Injectable()
export class BookRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bookService: BookService,
  ) {}

  router = this.trpc.router({
    // queries
    getAll: this.trpc.procedure
      .input(this.bookService.getBooksSchema)
      .query(async ({ input }) => await this.bookService.books(input)),
    getOne: this.trpc.procedure
      .input(this.bookService.getBookSchema)
      .query(async ({ input }) => await this.bookService.book(input)),

    // mutations
    create: this.trpc.procedure
      .input(this.bookService.createBookSchema)
      .mutation(async ({ input }) => await this.bookService.createBook(input)),
    update: this.trpc.procedure
      .input(this.bookService.updateBookSchema)
      .mutation(async ({ input }) => await this.bookService.updateBook(input)),
    delete: this.trpc.procedure
      .input(this.bookService.getBookSchema)
      .mutation(async ({ input }) => await this.bookService.deleteBook(input)),
  });
}
