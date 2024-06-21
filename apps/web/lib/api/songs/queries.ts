import { db } from "@web/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@web/lib/auth/utils";
import { type SongId, songIdSchema, songs } from "@web/lib/db/schema/songs";

export const getSongs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(songs)
    .where(eq(songs.userId, session?.user.id!));
  const s = rows;
  return { songs: s };
};

export const getSongById = async (id: SongId) => {
  const { session } = await getUserAuth();
  const { id: songId } = songIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(songs)
    .where(and(eq(songs.id, songId), eq(songs.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { song: s };
};
