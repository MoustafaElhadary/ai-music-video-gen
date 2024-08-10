import { Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { GenerationRequestService } from './generation-request.service';

@Injectable()
export class GenerationRequestRouter {
  constructor(
    private trpc: TrpcService,
    private generationRequestService: GenerationRequestService,
  ) {}

  router = this.trpc.router({
    getAll: this.trpc.protectedProcedure
      .input(this.generationRequestService.getGenerationRequestsSchema)
      .query(({ input, ctx }) =>
        this.generationRequestService.generationRequests(input, ctx.user.id),
      ),
    getOne: this.trpc.protectedProcedure
      .input(this.generationRequestService.getGenerationRequestSchema)
      .query(({ input }) =>
        this.generationRequestService.generationRequest(input),
      ),
    create: this.trpc.protectedProcedure
      .input(this.generationRequestService.createGenerationRequestSchema)
      .mutation(async ({ input, ctx }) =>
        this.generationRequestService.createGenerationRequest(
          input,
          ctx.user.id,
        ),
      ),
    update: this.trpc.protectedProcedure
      .input(this.generationRequestService.updateGenerationRequestSchema)
      .mutation(async ({ input }) =>
        this.generationRequestService.updateGenerationRequest(input),
      ),
    delete: this.trpc.protectedProcedure
      .input(this.generationRequestService.deleteGenerationRequestSchema)
      .mutation(async ({ input }) =>
        this.generationRequestService.deleteGenerationRequest(input),
      ),
    getQueueStatus: this.trpc.protectedProcedure.query(async () =>
      this.generationRequestService.getQueueStatus(),
    ),
  });
}
