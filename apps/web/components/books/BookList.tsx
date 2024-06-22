"use client";
import { trpc } from "@web/lib/trpc/client";
import BookModal from "./BookModal";
import { z } from "zod";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { inferRouterOutputs } from "@trpc/server";
import { TRPCClientErrorLike } from "@trpc/client";
import { AppRouter } from "@server/trpc/trpc.router";

// type B = ReturnType<typeof trpc.books.getAll.useQuery>;
export type GetAllBooks = UseTRPCQueryResult<
  inferRouterOutputs<AppRouter>["books"]["getAll"],
  TRPCClientErrorLike<AppRouter>
>["data"];

export type Book = NonNullable<GetAllBooks>[0];

export default function BookList({ books }: { books: Book[] }) {
  const { data } = trpc.books.getAll.useQuery({});

  if (data?.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>{data?.map((book) => <BookComponent book={book} key={book.id} />)}</ul>
  );
}

const BookComponent = ({ book }: { book: Book }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{book.name}</div>
      </div>
      <BookModal book={book} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No books
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new book.
      </p>
      <div className="mt-6">
        <BookModal emptyState={true} />
      </div>
    </div>
  );
};
