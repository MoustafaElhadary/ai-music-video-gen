import { Injectable } from '@nestjs/common';
import { Book as _Book, Prisma } from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  getBookSchema: z.ZodType<Prisma.BookWhereUniqueInput> = z.any();

  async book(
    bookWhereUniqueInput: z.infer<typeof this.getBookSchema>,
  ): Promise<_Book | null> {
    return this.prisma.book.findUnique({
      where: bookWhereUniqueInput,
    });
  }

  getBooksSchema: z.ZodType<{
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }> = z.any();

  async books(params: z.infer<typeof this.getBooksSchema>): Promise<_Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  createBookSchema: z.ZodType<Prisma.BookCreateInput> = z.any();

  async createBook(
    data: z.infer<typeof this.createBookSchema>,
  ): Promise<_Book> {
    return this.prisma.book.create({
      data,
    });
  }

  updateBookSchema: z.ZodType<{
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }> = z.any();

  async updateBook(
    params: z.infer<typeof this.updateBookSchema>,
  ): Promise<_Book> {
    const { data, where } = params;
    return this.prisma.book.update({
      data,
      where,
    });
  }

  deleteBookSchema: z.ZodType<Prisma.BookWhereUniqueInput> = z.any();
  async deleteBook(
    where: z.infer<typeof this.deleteBookSchema>,
  ): Promise<_Book> {
    return this.prisma.book.delete({
      where,
    });
  }
}

export type Book = _Book;
export type BookCreateInput = Prisma.BookCreateInput;
