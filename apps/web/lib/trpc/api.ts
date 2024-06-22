import "server-only";

//  import { getUserAuth } from "@web/lib/auth/utils";
import { env } from "@web/lib/env.mjs";

import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import { AppRouter } from "@server/trpc/trpc.router";
import { TRPC_URL } from "./utils";
import { cookies } from "next/headers";
import { getUserAuth } from "../auth/utils";

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchLink({
      /**
       * If you want to use SSR, you need to use the server's full URL
       * @link https://trpc.io/docs/ssr
       **/
      url: TRPC_URL,
      // You can pass any HTTP headers you wish here
      async headers() {
        const token = await getUserAuth();

        return {
          cookie: cookies().toString(),
          Cookie: cookies().toString(),
          "x-trpc-source": "rsc",
        };
      },
    }),
  ],
});
