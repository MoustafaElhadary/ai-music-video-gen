import {getUserAuth} from '@web/lib/auth/utils';
import {cookies} from 'next/headers';

export async function createTRPCContext(opts: {headers: Headers}) {
	const {session} = await getUserAuth();

	return {
		...opts,
		headers: {
			...opts.headers,
			cookie: cookies().toString(),
			'x-trpc-source': 'rsc',
		},
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
