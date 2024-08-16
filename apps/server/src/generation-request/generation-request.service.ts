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
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '@server/core/constants';
import { BadRequestException } from '@nestjs/common';

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
    generationId: z.string(),
    senderName: z.string(),
    occasion: z.string(),
    recipientName: z.string(),
    prompt: z.string(),
  });

  async generateAIPrompt(
    input: z.infer<typeof this.aiPromptSchema>,
  ): Promise<{ prompt: string; suggestions: string }> {
    const generationRequest = await this.prisma.generationRequest.findUnique({
      where: { id: input.generationId },
    });

    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    const prompt = `Create a song for ${input.recipientName}'s ${input.occasion}, 
    requested by ${input.senderName}. 
    in the new prompt generated specify genre, mood, key trait, and tone. Original prompt: "${input.prompt}". 
    Be creative, fun, engaging. Keep prompt dense and under 180 characters MAX. Dense with key info. 
    Include sender's name. 
    Be very creative and generous with the details.
    Also provide suggestions on how to improve the prompt or what might be missing. 
    EXAMPLE PROMPT: A celebratory Pop Joyful song for XYZ's graduation from ABC University as a DEF.XYZ is Loving and intelligent, From XXX.
    `;

    const result = await generateObject({
      model: openai('gpt-4'),
      schema: z.object({
        suggestions: z.string(),
        prompt: z.string().max(200),
      }),
      prompt,
      maxRetries: 5,
    });

    await this.updateGenerationRequest({
      where: { id: input.generationId },
      data: { prompt: result.object.prompt },
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
    file: z.object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
      base64: z.string(),
    }),
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

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `File "${file.name}" exceeds the maximum size of ${MAX_FILE_SIZE_MB} MB`,
      );
    }

    const fileBuffer = Buffer.from(file.base64, 'base64');
    const fileName = `${generationRequestId}/${file.name}`;

    const data = await this.supabaseService.uploadFile(
      'user-uploads',
      fileName,
      fileBuffer,
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
