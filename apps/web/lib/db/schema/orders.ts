import { sql } from "drizzle-orm";
import { text, varchar, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getOrders } from "@web/lib/api/orders/queries";

import { nanoid, timestamps } from "@web/lib/utils";

export const orders = pgTable("orders", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  recipientName: text("recipient_name").notNull(),
  recipientPhoneNumber: text("recipient_phone_number").notNull(),
  userId: text("user_id").notNull(),
  prompt: text("prompt").notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for orders - used to validate API requests
const baseSchema = createSelectSchema(orders).omit(timestamps);

export const insertOrderSchema = createInsertSchema(orders).omit(timestamps);
export const insertOrderParams = baseSchema.extend({}).omit({
  id: true,
  userId: true,
});

export const updateOrderSchema = baseSchema;
export const updateOrderParams = baseSchema.extend({}).omit({
  userId: true,
});
export const orderIdSchema = baseSchema.pick({ id: true });

// Types for orders - used to type API request params and within Components
export type Order = typeof orders.$inferSelect;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type NewOrderParams = z.infer<typeof insertOrderParams>;
export type UpdateOrderParams = z.infer<typeof updateOrderParams>;
export type OrderId = z.infer<typeof orderIdSchema>["id"];

// this type infers the return from getOrders() - meaning it will include any joins
export type CompleteOrder = Awaited<
  ReturnType<typeof getOrders>
>["orders"][number];
