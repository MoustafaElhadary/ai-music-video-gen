"use client";

import {
  Song,
  NewSongParams,
  insertSongParams,
} from "@web/lib/db/schema/songs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Button } from "@web/components/ui/button";
import { z } from "zod";
import { Checkbox } from "@web/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SongForm = ({
  song,
  closeModal,
}: {
  song?: Song;
  closeModal?: () => void;
}) => {
  const editing = !!song?.id;

  const router = useRouter();
  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof insertSongParams>>({
    resolver: zodResolver(insertSongParams),
    defaultValues: song ?? {
      url: "",
      name: "",
      isPublic: false,
    },
  });

  const onSuccess = async (
    action: "create" | "update" | "delete",
    data?: { error?: string }
  ) => {
    if (data?.error) {
      toast.error(data.error);
      return;
    }

    await utils.songs.getSongs.invalidate();
    router.refresh();
    if (closeModal) closeModal();
    toast.success(`Song ${action}d!`);
  };

  const onError = (
    action: "create" | "update" | "delete",
    data: { error: string }
  ) => {
    toast.error(data.error);
  };

  const { mutate: createSong, isLoading: isCreating } =
    trpc.songs.createSong.useMutation({
      onSuccess: (res) => onSuccess("create"),
      onError: (err) => onError("create", { error: err.message }),
    });

  const { mutate: updateSong, isLoading: isUpdating } =
    trpc.songs.updateSong.useMutation({
      onSuccess: (res) => onSuccess("update"),
      onError: (err) => onError("update", { error: err.message }),
    });

  const { mutate: deleteSong, isLoading: isDeleting } =
    trpc.songs.deleteSong.useMutation({
      onSuccess: (res) => onSuccess("delete"),
      onError: (err) => onError("delete", { error: err.message }),
    });

  const handleSubmit = (values: NewSongParams) => {
    if (editing) {
      updateSong({ ...values, id: song.id });
    } else {
      createSong(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="url"
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
          name="isPublic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Public</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
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
            onClick={() => deleteSong({ id: song.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SongForm;
