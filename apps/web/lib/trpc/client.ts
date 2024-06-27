import {createTRPCReact} from '@trpc/react-query';

import {AppRouter} from '@server/trpc/trpc.router';
import {inferRouterOutputs} from '@trpc/server';

export const trpc = createTRPCReact<AppRouter>({});

export type RouterOutput = inferRouterOutputs<AppRouter>;
