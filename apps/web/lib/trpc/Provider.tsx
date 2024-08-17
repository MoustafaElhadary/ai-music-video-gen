'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink, loggerLink} from '@trpc/client';
import React, {useState} from 'react';

import {useAuth} from '@clerk/nextjs';
import {trpc} from './client';
import {TRPC_URL} from './utils';

export default function TrpcProvider({
	children,
	cookies,
}: {
	children: React.ReactNode;
	cookies: string;
}): React.ReactNode {
	const {getToken} = useAuth();

	console.log({TRPC_URL});
	const [queryClient] = useState(() => new QueryClient({}));
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				httpBatchLink({
					url: TRPC_URL,
					headers: async () => {
						const token = await getToken();
						const headers: Record<string, string> = {
							credentials: 'include',
							sameSite: 'lax',

							cookie: cookies,
							Cookie: cookies,
							'x-trpc-source': 'react',
							'Content-Type': 'application/json',
						};

						if (token) {
							headers['Authorization'] = `Bearer ${token}`;
						}

						return headers;
					},
				}),
			],
		}),
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	);
}
