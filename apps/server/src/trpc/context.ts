import { clerkClient } from '@clerk/clerk-sdk-node';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = async ({
  req,
}: trpcExpress.CreateExpressContextOptions) => {
  try {
    const source = req.headers['x-trpc-source'];
    let token: string | null = null;

    if (source === 'rsc') {
      const { cookie } = req.headers;
      token = cookie?.split('__session=')[1]?.split(';')[0] || null;
    } else {
      token = req.headers.authorization?.replace('Bearer ', '') || null;
    }

    if (!token) throw new Error('Token not found');

    const { sub } = await clerkClient.verifyToken(token);
    const user = await clerkClient.users.getUser(sub);

    return { user };
  } catch (error) {
    console.error('Error creating context:', error);
    return { user: null };
  }
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
