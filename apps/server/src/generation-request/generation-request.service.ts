import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import {
  GenerationRequest as _GenerationRequest,
  Prisma,
  RequestStatus,
  VideoImage,
} from '@prisma/client';
import { VIDEO_QUEUE } from '@server/core/constants';
import { PrismaService } from '@server/prisma/prisma.service';
import { Queue } from 'bull';

@Injectable()
export class GenerationRequestService {
  private readonly logger = new Logger(GenerationRequestService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue(VIDEO_QUEUE) private readonly videoQueue: Queue,
  ) {}

  async generationRequest(input: Prisma.GenerationRequestFindUniqueArgs) {
    return this.prisma.generationRequest.findUnique({
      ...input,
      include: { videoImages: true },
    });
  }

  async generationRequests(
    params: Prisma.GenerationRequestFindManyArgs,
  ): Promise<_GenerationRequest[]> {
    return this.prisma.generationRequest.findMany(params);
  }

  async createGenerationRequest(
    data: Prisma.GenerationRequestCreateInput,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.create({
      data,
    });
  }

  async updateGenerationRequest(
    params: Prisma.GenerationRequestUpdateArgs,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.update(params);
  }

  async deleteGenerationRequest(
    params: Prisma.GenerationRequestDeleteArgs,
  ): Promise<_GenerationRequest> {
    return this.prisma.generationRequest.delete(params);
  }

  async handleSuccessfulPayment(
    generationRequestId: string,
  ): Promise<_GenerationRequest> {
    this.logger.log(`Updating and queueing request ${generationRequestId}`);
    const updatedRequest = await this.prisma.generationRequest.update({
      where: { id: generationRequestId },
      data: { status: RequestStatus.PAID },
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

  async addVideoImage(generationRequestId: string, ...photoIds: string[]) {
    return this.prisma.videoImage.createMany({
      data: photoIds.map((photoId) => ({
        photoId,
        generationRequestId,
      })),
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
