import { Injectable } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { BookRouter } from '@server/book/book.router';
import { GenerationRequestRouter } from '@server/generation-request/generation-request.router';
import { StripeRouter } from '@server/stripe/stripe.router';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { createContext } from './context';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly bookRouter: BookRouter,
    private readonly generationRequestRouter: GenerationRequestRouter,
    private readonly stripeRouter: StripeRouter,
  ) {}

  appRouter = this.trpc.router({
    books: this.bookRouter.router,
    generationRequests: this.generationRequestRouter.router,
    stripe: this.stripeRouter.router,
  });

  applyMiddleware(app: INestApplication) {
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
