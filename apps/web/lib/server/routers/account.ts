import { getUserAuth } from "@web/lib/auth/utils";
import { publicProcedure, router } from "@web/lib/server/trpc";
import { getUserSubscriptionPlan } from "@web/lib/stripe/subscription";
export const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();
    return session;
  }),
  getSubscription: publicProcedure.query(async () => {
    const sub = await getUserSubscriptionPlan();
    return sub;
  }),
});
