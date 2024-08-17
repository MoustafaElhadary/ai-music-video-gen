import 'server-only';

import {createTRPCProxyClient, httpBatchLink, loggerLink} from '@trpc/client';

import {AppRouter} from '@server/trpc/trpc.router';
import {cookies} from 'next/headers';
import {TRPC_URL} from './utils';

console.log({TRPC_URL});

export const api = createTRPCProxyClient<AppRouter>({
	links: [
		loggerLink({
			enabled: () => true,
		}),
		httpBatchLink({
			/**
			 * If you want to use SSR, you need to use the server's full URL
			 * @link https://trpc.io/docs/ssr
			 **/
			url: TRPC_URL,
			// You can pass any HTTP headers you wish here
			headers() {
				return {
					cookie: cookies().toString(),
					Cookie: cookies().toString(),
					'x-trpc-source': 'rsc',
				};
			},
		}),
	],
});
