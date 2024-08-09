/* eslint-disable no-useless-constructor */

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
      .query(({ input }) =>
        this.generationRequestService.generationRequests(input),
      ),
    getOne: this.trpc.protectedProcedure
      .input(this.generationRequestService.getGenerationRequestSchema)
      .query(({ input }) =>
        this.generationRequestService.generationRequest(input),
      ),
    create: this.trpc.protectedProcedure
      .input(this.generationRequestService.createGenerationRequestSchema)
      .mutation(async ({ input }) =>
        this.generationRequestService.createGenerationRequest(input),
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
  });
}
