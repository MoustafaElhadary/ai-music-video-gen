import * as z from "zod"

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  rating: z.number().int().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
