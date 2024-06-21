import { db } from "@web/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  SongId,
  NewSongParams,
  UpdateSongParams,
  updateSongSchema,
  insertSongSchema,
  songs,
  songIdSchema,
} from "@web/lib/db/schema/songs";
import { getUserAuth } from "@web/lib/auth/utils";

export const createSong = async (song: NewSongParams) => {
  const { session } = await getUserAuth();
  const newSong = insertSongSchema.parse({
    ...song,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db.insert(songs).values(newSong).returning();
    return { song: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSong = async (id: SongId, song: UpdateSongParams) => {
  const { session } = await getUserAuth();
  const { id: songId } = songIdSchema.parse({ id });
  const newSong = updateSongSchema.parse({
    ...song,
    userId: session?.user.id!,
  });
  try {
    const [s] = await db
      .update(songs)
      .set({ ...newSong, updatedAt: new Date() })
      .where(and(eq(songs.id, songId!), eq(songs.userId, session?.user.id!)))
      .returning();
    return { song: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSong = async (id: SongId) => {
  const { session } = await getUserAuth();
  const { id: songId } = songIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(songs)
      .where(and(eq(songs.id, songId!), eq(songs.userId, session?.user.id!)))
      .returning();
    return { song: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
