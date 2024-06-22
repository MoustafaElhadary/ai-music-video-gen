import { getUserAuth } from "@web/lib/auth/utils";
import { publicProcedure, router } from "@web/lib/server/trpc";
export const accountRouter = router({
  getUser: publicProcedure.query(async () => {
    const { session } = await getUserAuth();
    return session;
  }),
});
