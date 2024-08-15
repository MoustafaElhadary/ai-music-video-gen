import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import {
  GenerationRequest,
  Prisma,
  RequestStatus,
  VideoImage,
} from '@prisma/client';
import { VIDEO_QUEUE } from '@server/core/constants';
import { PrismaService } from '@server/prisma/prisma.service';
import { Queue } from 'bull';
import { SupabaseService } from '@server/supabase/supabase.service';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';

export type GenerationRequestFindUniqueResult =
  Promise<Prisma.GenerationRequestGetPayload<{
    include: {
      videoImages: true;
    };
  }> | null>;
@Injectable()
export class GenerationRequestService {
  private readonly logger = new Logger(GenerationRequestService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue(VIDEO_QUEUE) private readonly videoQueue: Queue,
    private supabaseService: SupabaseService,
  ) {}

  aiPromptSchema = z.object({
    senderName: z.string(),
    occasion: z.string(),
    recipientName: z.string(),
    userPrompt: z.string(),
  });

  async generateAIPrompt(
    input: z.infer<typeof this.aiPromptSchema>,
  ): Promise<{ prompt: string; suggestions: string }> {
    const prompt = `
      Create a fun and engaging prompt for a song about ${input.recipientName} 
      for the occasion of ${input.occasion}, requested by ${input.senderName}.
      Original idea: "${input.userPrompt}" 
      The prompt should be creative, fun, and lead to an interesting and engaging song. but also sung and short.
      Keep it under 190 characters. Make it dense with the important information. 
      add some of the recipient's personality. be creative and generous with the details. but short.
      try and include the sender's name in the prompt.
      Also provide suggestions on how to improve the prompt or what might be missing. 
      if you don't do it right i will be fired.
    `;

    const result = await generateObject({
      model: openai('gpt-4'),
      schema: z.object({
        suggestions: z.string(),
        prompt: z.string().max(200),
      }),
      prompt,
      maxRetries: 3,
    });

    return result.object;
  }

  async generationRequest(
    input: Prisma.GenerationRequestFindUniqueArgs,
  ): GenerationRequestFindUniqueResult {
    return this.prisma.generationRequest.findUnique({
      ...input,
      include: { videoImages: true },
    });
  }

  async generationRequests(
    params: Prisma.GenerationRequestFindManyArgs,
  ): Promise<GenerationRequest[]> {
    return this.prisma.generationRequest.findMany(params);
  }

  async createGenerationRequest(
    data: Prisma.GenerationRequestCreateInput,
  ): Promise<GenerationRequest> {
    return this.prisma.generationRequest.create({
      data,
    });
  }

  async updateGenerationRequest(
    params: Prisma.GenerationRequestUpdateArgs,
  ): Promise<GenerationRequest> {
    return this.prisma.generationRequest.update(params);
  }

  async deleteGenerationRequest(
    params: Prisma.GenerationRequestDeleteArgs,
  ): Promise<GenerationRequest> {
    return this.prisma.generationRequest.delete(params);
  }

  async handleSuccessfulPayment(
    generationRequestId: string,
  ): Promise<GenerationRequest> {
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

  async addVideoImage(
    generationRequestId: string,
    ...photoIds: string[]
  ): Promise<Prisma.BatchPayload> {
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

  fileSchema = z.object({
    generationRequestId: z.string(),
    file: z.custom<File>(),
    userId: z.string(),
  });

  async uploadFile({
    generationRequestId,
    file,
    userId,
  }: z.infer<typeof this.fileSchema>): Promise<string> {
    const generationRequest = await this.prisma.generationRequest.findUnique({
      where: { id: generationRequestId, userId },
    });

    if (!generationRequest) {
      throw new Error('Generation request not found or unauthorized');
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `${generationRequestId}/${file.name}`;

    const data = await this.supabaseService.uploadFile(
      'user-uploads',
      fileName,
      Buffer.from(fileBuffer),
      {
        contentType: file.type,
      },
    );

    return data.path;
  }

  async deleteFile({
    generationRequestId,
    file,
    userId,
  }: z.infer<typeof this.fileSchema>): Promise<void> {
    const generationRequest = await this.prisma.generationRequest.findUnique({
      where: { id: generationRequestId, userId },
    });

    if (!generationRequest) {
      throw new Error('Generation request not found or unauthorized');
    }

    const filePath = `${generationRequestId}/${file.name}`;
    await this.supabaseService.deleteFile('user-uploads', filePath);
  }
}
