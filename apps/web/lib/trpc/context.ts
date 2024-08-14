import {AuthSession, getUserAuth} from '@web/lib/auth/utils';
import {cookies} from 'next/headers';

export async function createTRPCContext(opts: {headers: Headers}): Promise<{
	headers: Headers;
	session: AuthSession['session'];
}> {
	const {session} = await getUserAuth();

	return {
		...opts,
		headers: new Headers({
			...Object.fromEntries(opts.headers.entries()),
			cookie: cookies().toString(),
			'x-trpc-source': 'rsc',
		}),
		session,
	};
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
