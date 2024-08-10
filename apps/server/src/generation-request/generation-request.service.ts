import { Injectable } from '@nestjs/common';
import {
  GenerationRequest as _GenerationRequest,
  Prisma,
  RequestStatus,
  VideoImage,
} from '@prisma/client';
import { PrismaService } from '@server/prisma/prisma.service';
import { z } from 'zod';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { VIDEO_QUEUE } from '@server/core/constants';
import { Logger } from '@nestjs/common';

@Injectable()
export class GenerationRequestService {
  private readonly logger = new Logger(GenerationRequestService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue(VIDEO_QUEUE) private readonly videoQueue: Queue,
  ) {}

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
    userId: string,
  ): Promise<_GenerationRequest[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.generationRequest.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        userId,
      },
      orderBy,
    });
  }

  createGenerationRequestSchema = z.object({
    occasion: z.string(),
    recipientName: z.string(),
    prompt: z.string(),
    senderName: z.string(),
  });

  async createGenerationRequest(
    data: z.infer<typeof this.createGenerationRequestSchema>,
    userId: string,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.create({
      data: {
        ...data,
        userId,
      },
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
      sunoSongId: z.string().optional(),
      finalVideoPath: z.string().optional(),
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

  async updateGenerationRequestStatusAndQueue(
    generationRequestId: string,
    status: RequestStatus,
  ): Promise<_GenerationRequest> {
    this.logger.log(`Updating and queueing request ${generationRequestId}`);
    const updatedRequest = await this.prisma.generationRequest.update({
      where: { id: generationRequestId },
      data: { status },
    });

    this.logger.log(`Queueing job for request ${generationRequestId}`);
    const job = await this.videoQueue.add(updatedRequest, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
    });
    this.logger.log(
      `Job ${job.id} added to queue for request ${generationRequestId}`,
    );

    return updatedRequest;
  }

  // Add a method to check the queue status
  async getQueueStatus(): Promise<any> {
    const jobCounts = await this.videoQueue.getJobCounts();
    this.logger.log(`Current queue status: ${JSON.stringify(jobCounts)}`);
    return jobCounts;
  }

  async addVideoImage(
    generationRequestId: string,
    photoId: string,
  ): Promise<VideoImage> {
    return this.prisma.videoImage.create({
      data: {
        photoId,
        generationRequestId,
      },
    });
  }

  async getVideoImages(generationRequestId: string): Promise<VideoImage[]> {
    return this.prisma.videoImage.findMany({
      where: {
        generationRequestId,
      },
    });
  }
}
