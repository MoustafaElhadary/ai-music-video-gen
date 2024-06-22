import { getUserAuth } from "@web/lib/auth/utils";

export async function createTRPCContext(opts: { headers: Headers }) {
  const { session } = await getUserAuth();

  return {
    session: session,
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
