import { db } from "@web/lib/db/index";
import { and, eq } from "drizzle-orm";
import {
  OrderId,
  NewOrderParams,
  UpdateOrderParams,
  updateOrderSchema,
  insertOrderSchema,
  orders,
  orderIdSchema,
} from "@web/lib/db/schema/orders";
import { getUserAuth } from "@web/lib/auth/utils";

export const createOrder = async (order: NewOrderParams) => {
  const { session } = await getUserAuth();
  const newOrder = insertOrderSchema.parse({
    ...order,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db.insert(orders).values(newOrder).returning();
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateOrder = async (id: OrderId, order: UpdateOrderParams) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const newOrder = updateOrderSchema.parse({
    ...order,
    userId: session?.user.id!,
  });
  try {
    const [o] = await db
      .update(orders)
      .set({ ...newOrder, updatedAt: new Date() })
      .where(and(eq(orders.id, orderId!), eq(orders.userId, session?.user.id!)))
      .returning();
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteOrder = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  try {
    const [o] = await db
      .delete(orders)
      .where(and(eq(orders.id, orderId!), eq(orders.userId, session?.user.id!)))
      .returning();
    return { order: o };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
