import { Injectable, Logger } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { VIDEOS_FOLDER } from '@server/core/constants';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { SupabaseService } from '@server/supabase/supabase.service';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private generationRequestService: GenerationRequestService,
    private supabaseService: SupabaseService,
  ) {}

  public async uploadAndFinalize(id: string): Promise<void> {
    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.finalVideoPath) {
      this.logger.log('Video already uploaded, skipping...');
      return;
    }

    if (!generationRequest.localVideoPath) {
      await this.generationRequestService.simpleUpdate(generationRequest.id, {
        status: RequestStatus.UPLOAD_FAILED,
      });
      throw new Error('Video not found');
    }

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
      status: RequestStatus.UPLOADING,
    });

    const videoUrl = await this.uploadVideo(generationRequest.localVideoPath);
    if (!videoUrl) {
      await this.generationRequestService.simpleUpdate(generationRequest.id, {
        status: RequestStatus.UPLOAD_FAILED,
      });
      throw new Error('Failed to upload video');
    }

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
      status: RequestStatus.COMPLETED,
      finalVideoPath: videoUrl,
    });
  }

  private async uploadVideo(videoPath: string): Promise<string | undefined> {
    try {
      const fileContent = await fs.promises.readFile(videoPath);
      const filename = path.basename(videoPath);

      const data = await this.supabaseService.uploadFile(
        VIDEOS_FOLDER,
        `${filename}`,
        fileContent,
        {
          contentType: 'video/mp4',
        },
      );

      return data?.path;
    } catch (error) {
      this.logger.error('Error uploading video:', error);
      return undefined;
    }
  }
}
