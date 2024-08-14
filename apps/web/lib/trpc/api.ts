import 'server-only';

import {createTRPCProxyClient, httpBatchLink, loggerLink} from '@trpc/client';

import {AppRouter} from '@server/trpc/trpc.router';
import {cookies} from 'next/headers';
import {TRPC_URL} from './utils';

export const api = createTRPCProxyClient<AppRouter>({
	links: [
		loggerLink({
			enabled: (op) =>
				process.env.NODE_ENV === 'development' ||
				(op.direction === 'down' && op.result instanceof Error),
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
