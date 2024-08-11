import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { GenerationRequestService } from './generation-request.service';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenerationRequestRouter {
  constructor(
    private trpc: TrpcService,
    private generationRequestService: GenerationRequestService,
  ) {}

  router = this.trpc.router({
    getAll: this.trpc.protectedProcedure
      .input(z.custom<Prisma.GenerationRequestFindManyArgs>())
      .query(({ input, ctx }) =>
        this.generationRequestService.generationRequests({
          ...input,
          where: {
            userId: ctx.user.id,
          },
        }),
      ),
    getOne: this.trpc.protectedProcedure
      .input(z.custom<Prisma.GenerationRequestFindUniqueArgs>())
      .query(({ input }) =>
        this.generationRequestService.generationRequest(input),
      ),
    create: this.trpc.protectedProcedure
      .input(z.custom<Prisma.GenerationRequestCreateInput>())
      .mutation(async ({ input, ctx }) =>
        this.generationRequestService.createGenerationRequest({
          ...input,
          userId: ctx.user.id,
        }),
      ),
    update: this.trpc.protectedProcedure
      .input(z.custom<Prisma.GenerationRequestUpdateArgs>())
      .mutation(async ({ input }) =>
        this.generationRequestService.updateGenerationRequest(input),
      ),
    delete: this.trpc.protectedProcedure
      .input(z.custom<Prisma.GenerationRequestDeleteArgs>())
      .mutation(async ({ input }) =>
        this.generationRequestService.deleteGenerationRequest(input),
      ),
    getQueueStatus: this.trpc.protectedProcedure.query(async () =>
      this.generationRequestService.getQueueStatus(),
    ),
  });
}
