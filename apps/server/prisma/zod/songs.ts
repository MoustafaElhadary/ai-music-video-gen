import * as z from "zod"

export const songsSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  is_public: z.boolean(),
  user_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
