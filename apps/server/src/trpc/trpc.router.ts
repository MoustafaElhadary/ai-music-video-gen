import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';

const baseSchema = z.object({
  name: z.string(),
  id: z.string(),
  url: z.string(),
  isPublic: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const insertSongParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    id: true,
    userId: true,
  });

const updateSongParams = baseSchema
  .extend({
    isPublic: z.coerce.boolean(),
  })
  .omit({
    userId: true,
  });
const songIdSchema = baseSchema.pick({ id: true });

type Song = z.infer<typeof baseSchema>;

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),
    songs: this.trpc.router({
      getSongs: this.trpc.procedure.query(async () => {
        // wait 1 second
        await new Promise((resolve) => setTimeout(resolve, 500));
        return {
          songs: [
            {
              name: 'string',
              id: 'string',
              url: 'string',
              isPublic: true,
              userId: 'string',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ] as Song[],
        };
      }),
      getSongById: this.trpc.procedure
        .input(songIdSchema)
        .query(async ({ input }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            song: {
              name: 'string',
              id: 'string',
              url: 'string',
              isPublic: true,
              userId: 'string',
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Song,
          };
        }),
      createSong: this.trpc.procedure
        .input(insertSongParams)
        .mutation(async ({ input }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            song: {
              name: 'string',
              id: 'string',
              url: 'string',
              isPublic: true,
              userId: 'string',
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Song,
          };
        }),
      updateSong: this.trpc.procedure
        .input(updateSongParams)
        .mutation(async ({ input }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            song: {
              name: 'string',
              id: 'string',
              url: 'string',
              isPublic: true,
              userId: 'string',
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Song,
          };
        }),
      deleteSong: this.trpc.procedure
        .input(songIdSchema)
        .mutation(async ({ input }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            song: {
              name: 'string',
              id: 'string',
              url: 'string',
              isPublic: true,
              userId: 'string',
              createdAt: new Date(),
              updatedAt: new Date(),
            } as Song,
          };
        }),
    }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
