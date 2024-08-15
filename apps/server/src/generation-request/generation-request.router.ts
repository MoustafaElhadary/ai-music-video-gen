import { Injectable } from '@nestjs/common';
import {
  GenerationRequestCreateInputSchema,
  GenerationRequestDeleteArgsSchema,
  GenerationRequestFindManyArgsSchema,
  GenerationRequestFindUniqueArgsSchema,
  GenerationRequestUpdateArgsSchema,
} from '../prisma/generated/zod';
import { TrpcService } from '../trpc/trpc.service';
import { GenerationRequestService } from './generation-request.service';

@Injectable()
export class GenerationRequestRouter {
  constructor(
    private trpc: TrpcService,
    private generationRequestService: GenerationRequestService,
  ) {}

  router = this.trpc.router({
    getAll: this.trpc.protectedProcedure
      .input(GenerationRequestFindManyArgsSchema)
      .query(({ input, ctx }) =>
        this.generationRequestService.generationRequests({
          ...input,
          where: {
            userId: ctx.user.id,
          },
        }),
      ),
    getOne: this.trpc.protectedProcedure
      .input(GenerationRequestFindUniqueArgsSchema)
      .query(({ input }) =>
        this.generationRequestService.generationRequest(input),
      ),
    create: this.trpc.protectedProcedure
      .input(GenerationRequestCreateInputSchema.omit({ userId: true }))
      .mutation(async ({ input, ctx }) =>
        this.generationRequestService.createGenerationRequest({
          ...input,
          userId: ctx.user.id,
        }),
      ),
    update: this.trpc.protectedProcedure
      .input(GenerationRequestUpdateArgsSchema)
      .mutation(async ({ input }) =>
        this.generationRequestService.updateGenerationRequest(input),
      ),
    delete: this.trpc.protectedProcedure
      .input(GenerationRequestDeleteArgsSchema)
      .mutation(async ({ input }) =>
        this.generationRequestService.deleteGenerationRequest(input),
      ),

    uploadFile: this.trpc.protectedProcedure
      .input(this.generationRequestService.fileSchema.omit({ userId: true }))
      .mutation(async ({ input, ctx }) =>
        this.generationRequestService.uploadFile({
          ...input,
          userId: ctx.user.id,
        }),
      ),
    deleteFile: this.trpc.protectedProcedure
      .input(this.generationRequestService.fileSchema.omit({ userId: true }))
      .mutation(async ({ input, ctx }) =>
        this.generationRequestService.deleteFile({
          generationRequestId: input.generationRequestId,
          file: input.file,
          userId: ctx.user.id,
        }),
      ),
    generateAIPrompt: this.trpc.protectedProcedure
      .input(this.generationRequestService.aiPromptSchema)
      .mutation(async ({ input }) => {
        return this.generationRequestService.generateAIPrompt(input);
      }),
  });
}
