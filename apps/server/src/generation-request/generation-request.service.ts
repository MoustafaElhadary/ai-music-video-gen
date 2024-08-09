/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  GenerationRequest as _GenerationRequest,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';
import { z } from 'zod';

@Injectable()
export class GenerationRequestService {
  constructor(private prisma: PrismaService) {}

  getGenerationRequestSchema: z.ZodType<Prisma.GenerationRequestWhereUniqueInput> =
    z.object({
      id: z.string(),
    });

  async generationRequest(
    generationRequestWhereUniqueInput: z.infer<
      typeof this.getGenerationRequestSchema
    >,
  ): Promise<_GenerationRequest | null> {
    return this.prisma.generationRequest.findUnique({
      where: generationRequestWhereUniqueInput,
    });
  }

  getGenerationRequestsSchema: z.ZodType<{
    skip?: number;
    take?: number;
    cursor?: Prisma.GenerationRequestWhereUniqueInput;
    where?: Prisma.GenerationRequestWhereInput;
    orderBy?: Prisma.GenerationRequestOrderByWithRelationInput;
  }> = z.object({
    skip: z.number().optional(),
    take: z.number().optional(),
    cursor: z.object({ id: z.string() }).optional(),
    where: z.any().optional(),
    orderBy: z.any().optional(),
  });

  async generationRequests(
    params: z.infer<typeof this.getGenerationRequestsSchema>,
  ): Promise<_GenerationRequest[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.generationRequest.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  createGenerationRequestSchema: z.ZodType<Prisma.GenerationRequestCreateInput> =
    z.object({
      occasion: z.string(),
      recipientName: z.string(),
      prompt: z.string(),
    });

  async createGenerationRequest(
    data: z.infer<typeof this.createGenerationRequestSchema>,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.create({
      data,
    });
  }

  updateGenerationRequestSchema: z.ZodType<{
    where: Prisma.GenerationRequestWhereUniqueInput;
    data: Prisma.GenerationRequestUpdateInput;
  }> = z.object({
    where: z.object({ id: z.string() }),
    data: z.object({
      occasion: z.string().optional(),
      recipientName: z.string().optional(),
      prompt: z.string().optional(),
    }),
  });

  async updateGenerationRequest(
    params: z.infer<typeof this.updateGenerationRequestSchema>,
  ): Promise<_GenerationRequest> {
    const { data, where } = params;
    return this.prisma.generationRequest.update({
      data,
      where,
    });
  }

  deleteGenerationRequestSchema: z.ZodType<Prisma.GenerationRequestWhereUniqueInput> =
    z.object({
      id: z.string(),
    });

  async deleteGenerationRequest(
    where: z.infer<typeof this.deleteGenerationRequestSchema>,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.delete({
      where,
    });
  }
}

export type GenerationRequestCreateInput = z.infer<
  typeof GenerationRequestService.prototype.createGenerationRequestSchema
>;
