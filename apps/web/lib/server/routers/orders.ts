import { getOrderById, getOrders } from "@web/lib/api/orders/queries";
import { publicProcedure, router } from "@web/lib/server/trpc";
import {
  orderIdSchema,
  insertOrderParams,
  updateOrderParams,
} from "@web/lib/db/schema/orders";
import {
  createOrder,
  deleteOrder,
  updateOrder,
} from "@web/lib/api/orders/mutations";

export const ordersRouter = router({
  getOrders: publicProcedure.query(async () => {
    return getOrders();
  }),
  getOrderById: publicProcedure
    .input(orderIdSchema)
    .query(async ({ input }) => {
      return getOrderById(input.id);
    }),
  createOrder: publicProcedure
    .input(insertOrderParams)
    .mutation(async ({ input }) => {
      return createOrder(input);
    }),
  updateOrder: publicProcedure
    .input(updateOrderParams)
    .mutation(async ({ input }) => {
      return updateOrder(input.id, input);
    }),
  deleteOrder: publicProcedure
    .input(orderIdSchema)
    .mutation(async ({ input }) => {
      return deleteOrder(input.id);
    }),
});
