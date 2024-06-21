import { computersRouter } from "./computers";
import { router } from "@web/lib/server/trpc";
import { accountRouter } from "./account";
import { ordersRouter } from "./orders";
import { songsRouter } from "./songs";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  orders: ordersRouter,
  songs: songsRouter,
});

export type AppRouter = typeof appRouter;
