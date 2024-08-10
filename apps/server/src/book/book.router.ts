import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { BookService } from './book.service';

@Injectable()
export class BookRouter {
  constructor(
    private trpc: TrpcService,
    private bookService: BookService,
  ) {}

  router = this.trpc.router({
    // Queries
    getAll: this.trpc.protectedProcedure
      .input(this.bookService.getBooksSchema)
      .query(({ input }) => this.bookService.books(input)),
    getOne: this.trpc.protectedProcedure
      .input(this.bookService.getBookSchema)
      .query(({ input }) => this.bookService.book(input)),

    // Mutations
    create: this.trpc.protectedProcedure
      .input(this.bookService.createBookSchema)
      .mutation(async ({ input }) => this.bookService.createBook(input)),
    update: this.trpc.protectedProcedure
      .input(this.bookService.updateBookSchema)
      .mutation(async ({ input }) => this.bookService.updateBook(input)),
    delete: this.trpc.protectedProcedure
      .input(this.bookService.getBookSchema)
      .mutation(async ({ input }) => this.bookService.deleteBook(input)),
  });
}
