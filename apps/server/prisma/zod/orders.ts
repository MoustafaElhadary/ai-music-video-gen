import * as z from "zod"

export const ordersSchema = z.object({
  id: z.string(),
  recipient_name: z.string(),
  recipient_phone_number: z.string(),
  user_id: z.string(),
  prompt: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})
