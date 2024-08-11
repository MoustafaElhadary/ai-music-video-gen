import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { BookService } from './book.service';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookRouter {
  constructor(
    private trpc: TrpcService,
    private bookService: BookService,
  ) {}

  router = this.trpc.router({
    // Queries
    getAll: this.trpc.protectedProcedure
      .input(z.custom<Prisma.BookFindManyArgs>())
      .query(({ input }) => this.bookService.books(input)),
    getOne: this.trpc.protectedProcedure
      .input(z.custom<Prisma.BookFindUniqueArgs>())
      .query(({ input }) => this.bookService.book(input)),

    // Mutations
    create: this.trpc.protectedProcedure
      .input(z.custom<Prisma.BookCreateInput>())
      .mutation(async ({ input }) => this.bookService.createBook(input)),
    update: this.trpc.protectedProcedure
      .input(z.custom<Prisma.BookUpdateArgs>())
      .mutation(async ({ input }) => this.bookService.updateBook(input)),
    delete: this.trpc.protectedProcedure
      .input(z.custom<Prisma.BookDeleteArgs>())
      .mutation(async ({ input }) => this.bookService.deleteBook(input)),
  });
}
