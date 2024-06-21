import { sql } from "drizzle-orm";
import {
  text,
  boolean,
  varchar,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getSongs } from "@web/lib/api/songs/queries";

import { nanoid, timestamps } from "@web/lib/utils";

export const songs = pgTable("songs", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  url: text("url").notNull(),
  name: text("name").notNull(),
  isPublic: boolean("is_public").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for songs - used to validate API requests
const baseSchema = createSelectSchema(songs).omit(timestamps);

export const insertSongSchema = createInsertSchema(songs).omit(timestamps);
export const insertSongParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateSongSchema = baseSchema;
export const updateSongParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
export const songIdSchema = baseSchema.pick({ id: true });

// Types for songs - used to type API request params and within Components
export type Song = typeof songs.$inferSelect;
export type NewSong = z.infer<typeof insertSongSchema>;
export type NewSongParams = z.infer<typeof insertSongParams>;
export type UpdateSongParams = z.infer<typeof updateSongParams>;
export type SongId = z.infer<typeof songIdSchema>["id"];

// this type infers the return from getSongs() - meaning it will include any joins
export type CompleteSong = Awaited<
  ReturnType<typeof getSongs>
>["songs"][number];
