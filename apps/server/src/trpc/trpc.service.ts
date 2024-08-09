import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
import { ZodError } from 'zod';

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<Context>().create({
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  isAuthed = this.trpc.middleware(({ next, ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx,
    });
  });

  publicProcedure = this.trpc.procedure;
  protectedProcedure = this.trpc.procedure.use(this.isAuthed);
}
