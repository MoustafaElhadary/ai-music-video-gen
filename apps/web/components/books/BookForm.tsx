"use client";

import { useForm } from "react-hook-form";

import { BookCreateInput } from "@server/book/book.service";
import { Button } from "@web/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@web/components/ui/form";
import { Input } from "@web/components/ui/input";
import { trpc } from "@web/lib/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Book } from "./BookList";

const BookForm = ({
  book,
  closeModal,
}: {
  book?: Book;
  closeModal?: () => void;
}) => {
  const editing = !!book?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<BookCreateInput>({
    defaultValues: book ?? {
      name: "",
      author: "",
      rating: 0,
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string },
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.books.getAll.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Book ${action}d!`);
  };

  const onError = (
    action: "create" | "update" | "delete",
    data: { error: string },
  ) => {
    toast.error(data.error);
  };

  const { mutate: createBook, isLoading: isCreating } =
    trpc.books.create.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateBook, isLoading: isUpdating } =
    trpc.books.update.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteBook, isLoading: isDeleting } =
    trpc.books.delete.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: BookCreateInput) => {
    if (editing) {
      updateBook({ where: { id: book.id }, data: values });
    } else {
      createBook(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input {...field} value={field.value?.toString() || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteBook({ id: book.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default BookForm;
