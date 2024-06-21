import { getSongById, getSongs } from "@web/lib/api/songs/queries";
import { protectedProcedure, router } from "@web/lib/server/trpc";
import {
  songIdSchema,
  insertSongParams,
  updateSongParams,
} from "@web/lib/db/schema/songs";
import {
  createSong,
  deleteSong,
  updateSong,
} from "@web/lib/api/songs/mutations";

export const songsRouter = router({
  getSongs: protectedProcedure.query(async () => getSongs()),
  getSongById: protectedProcedure
    .input(songIdSchema)
    .query(async ({ input }) => getSongById(input.id)),
  createSong: protectedProcedure
    .input(insertSongParams)
    .mutation(async ({ input }) => createSong(input)),
  updateSong: protectedProcedure
    .input(updateSongParams)
    .mutation(async ({ input }) => updateSong(input.id, input)),
  deleteSong: protectedProcedure
    .input(songIdSchema)
    .mutation(async ({ input }) => deleteSong(input.id)),
});
