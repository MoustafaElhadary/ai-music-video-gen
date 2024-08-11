import { Injectable } from '@nestjs/common';
import { Book, Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async book(input: Prisma.BookFindUniqueArgs): Promise<Book | null> {
    return this.prisma.book.findUnique(input);
  }

  async books(params: Prisma.BookFindManyArgs): Promise<Book[]> {
    return this.prisma.book.findMany(params);
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data,
    });
  }

  async updateBook(params: Prisma.BookUpdateArgs): Promise<Book> {
    return this.prisma.book.update(params);
  }

  async deleteBook(params: Prisma.BookDeleteArgs): Promise<Book> {
    return this.prisma.book.delete(params);
  }
}
