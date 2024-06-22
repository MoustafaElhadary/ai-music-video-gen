import "server-only";

//  import { getUserAuth } from "@web/lib/auth/utils";
// import { appRouter } from "@web/lib/server/routers/_app";
import { env } from "@web/lib/env.mjs";
import { createTRPCContext } from "./context";

import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";

import { cookies } from "next/headers";
import { cache } from "react";

import { AppRouter } from "@server/trpc/trpc.router";
import { TRPC_URL } from "./utils";

const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
  });
});

export const api = createTRPCProxyClient<AppRouter>({
  // transformer: SuperJSON,
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
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});

// export const api = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:4000/trpc", // you should update this to use env variables
//     }),
//   ],
// });
