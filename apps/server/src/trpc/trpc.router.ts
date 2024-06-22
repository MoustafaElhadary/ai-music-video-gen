import { INestApplication, Injectable } from '@nestjs/common';
import { BookRouter } from '@server/book/book.router';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './context';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bookRouter: BookRouter,
  ) {}

  appRouter = this.trpc.router({
    books: this.bookRouter.router,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
