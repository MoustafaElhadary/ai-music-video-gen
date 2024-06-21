import { db } from "@web/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@web/lib/auth/utils";
import { type OrderId, orderIdSchema, orders } from "@web/lib/db/schema/orders";

export const getOrders = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, session?.user.id!));
  const o = rows;
  return { orders: o };
};

export const getOrderById = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(orders)
    .where(and(eq(orders.id, orderId), eq(orders.userId, session?.user.id!)));
  if (row === undefined) return {};
  const o = row;
  return { order: o };
};
