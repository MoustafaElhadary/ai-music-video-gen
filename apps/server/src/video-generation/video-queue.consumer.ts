/* eslint-disable max-params */

import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GenerationRequest, RequestStatus } from '@prisma/client';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { VIDEO_QUEUE } from '@server/core/constants';
import {
  GenerationRequestFindUniqueResult,
  GenerationRequestService,
} from '@server/generation-request/generation-request.service';
import {
  CompositionId,
  getCompositionProps,
} from '@server/remotion/type-utils';
import { SceneDataSchema } from '@server/remotion/types';
import { type Job } from 'bull';
import path from 'path';
import { z } from 'zod';
import { AudioService } from './services/audio.service';
import { ImageService } from './services/image.service';
import { SubtitleService } from './services/subtitle.service';
import { UploadService } from './services/upload.service';
import fs from 'fs';

@Processor(VIDEO_QUEUE)
export class VideoQueueConsumer {
  constructor(
    private generationRequestService: GenerationRequestService,
    private audioService: AudioService,
    private imageService: ImageService,
    private subtitleService: SubtitleService,
    private uploadService: UploadService,
  ) {}

  private readonly logger = new Logger(VideoQueueConsumer.name);

  @Process()
  async processJobRequest(job: Job<GenerationRequest>): Promise<void> {
    this.logger.log(
      `Starting to process job ${job.id} for request ${job.data.id}`,
    );
    const { id } = job.data;

    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    try {
      await this.audioService.processAudio(id);
      await this.subtitleService.processSubtitles(id);
      await this.imageService.processImages(id);
      await this.processVideo(id);
      await this.uploadService.uploadAndFinalize(id);

      this.logger.log(`Successfully processed job ${job.id}`);
    } catch (error) {
      this.logger.error(`Error processing job ${job.id}:`, error);
      await this.generationRequestService.simpleUpdate(id, {
        status: RequestStatus.FAILED,
      });
      throw error;
    }
  }

  private async processVideo(id: string): Promise<void> {
    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.finalVideoPath) {
      this.logger.log('Video already generated, skipping...');
      return;
    }

    await this.generationRequestService.simpleUpdate(id, {
      status: RequestStatus.VIDEO_PROCESSING,
    });

    const videoPath = await this.createVideo(generationRequest.id);
    if (!videoPath) {
      await this.generationRequestService.simpleUpdate(generationRequest.id, {
        status: RequestStatus.VIDEO_FAILED,
      });
      throw new Error('Failed to create video');
    }

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
      localVideoPath: videoPath,
      status: RequestStatus.VIDEO_PROCESSED,
    });
  }

  private async createVideo(id: string): Promise<string> {
    try {
      const generationRequest =
        await this.generationRequestService.requestByIdWithImages(id);
      if (!generationRequest) {
        throw new Error('Generation request not found');
      }

      const compositionId: CompositionId = 'GeneratedVideo';

      const serveUrl = await bundle({
        entryPoint: path.resolve('./src/remotion/index.ts'),
        webpackOverride: (config) => config,
      });

      const inputProps = getCompositionProps(compositionId, {
        data: this.videoPropsData(generationRequest),
      });

      // Ensure the output directory exists
      const outDir = path.resolve('./out');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      // Save the input props to the folder
      fs.writeFileSync(
        path.join(outDir, `${id}.json`),
        JSON.stringify(inputProps),
      );

      const composition = await selectComposition({
        serveUrl,
        id: compositionId,
        inputProps,
      });

      const outputLocation = `out/${compositionId}-${id}.mp4`;
      await renderMedia({
        composition,
        serveUrl,
        codec: 'h264',
        outputLocation,
        inputProps,
      });

      return outputLocation;
    } catch (error) {
      this.logger.error('Error creating video:', error);
      throw error;
    }
  }

  private videoPropsData(
    generationRequest: GenerationRequestFindUniqueResult,
  ): z.infer<typeof SceneDataSchema>[] {
    const output: z.infer<typeof SceneDataSchema>[] = [];

    const durationInSeconds = Number(generationRequest.duration!);
    // add Music
    output.push({
      name: 'Background Music',
      durationInSeconds,
      startFrom: 0,
      media: [
        {
          url: generationRequest.sunoAudioUrl!,
          type: 'audio/mpeg',
        },
      ],
      volume: 1,
    });

    // add Background Color

    output.push({
      name: 'Background',
      durationInSeconds,
      startFrom: 0,
      bgStyle: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400',
    });

    // add Occasion Text with recipient name

    output.push({
      name: 'Occasion Text',
      durationInSeconds,
      startFrom: 0,
      text: 'Happy Birthday XYZ', //TODO: use ai to generate the title
      textStyle:
        'text-8xl font-bold text-white text-center absolute top-20 left-0 right-0',
    });
    // add images
    const imageDuration = 9; // Duration for each image in seconds
    const images = generationRequest.videoImages.map((p) => p.photoId);
    let currentStartTime = 0;

    while (currentStartTime < durationInSeconds) {
      for (
        let i = 0;
        i < images.length && currentStartTime < durationInSeconds;
        i++
      ) {
        output.push({
          name: `Image${i + 1}`,
          durationInSeconds: Math.min(
            imageDuration,
            durationInSeconds - currentStartTime,
          ),
          startFrom: currentStartTime,
          media: [
            {
              url: images[i]!,
              type: 'image/png',
            },
          ],
          mediaStyle:
            'w-4/5 h-auto mx-auto absolute top-72 left-0 right-0 rounded-3xl',
          animation: [
            'Move({ x: 0, y: 0, initialX: 1210, initialY: 0, duration: 30, overshootClamping: false })',
            `Fade({ from: 1, to: 0, duration: 30, start: ${Math.min(imageDuration, durationInSeconds - currentStartTime) * 30 - 30} })`,
          ],
        });
        currentStartTime += imageDuration;
      }
    }

    // add dotted border container
    output.push({
      name: 'Dotted Border Container',
      durationInSeconds,
      startFrom: 0,
      children: [
        {
          className:
            'border-4 border-dotted border-white rounded-xl mx-auto w-11/12 h-1/2 absolute bottom-32 left-0 right-0 p-4 overflow-hidden',
        },
      ],
    });

    // add from //TODO: animate the text
    output.push({
      name: 'From Text',
      durationInSeconds,
      startFrom: 0,
      text: `From: ${generationRequest.senderName}`,
      textStyle:
        'text-6xl font-semibold text-white text-left absolute bottom-4 left-8',
    });

    // add logo //TODO: animate the text
    output.push({
      name: 'Logo',
      durationInSeconds,
      startFrom: 0,
      text: `GIDDY`,
      textStyle:
        'text-6xl font-semibold text-white text-right absolute bottom-4 right-8',
    });

    // add subtitles

    output.push({
      name: 'Subtitles',
      durationInSeconds,
      startFrom: 0,
      subtitles: {
        onlyDisplayCurrentSentence: false,
        subtitlesTextColor: 'rgba(255, 255, 255, 0.9)',
        srt: generationRequest.srt ?? '',
        isRTL: generationRequest.isRTL ?? false,
        audioOffsetInSeconds: 4,
        subtitlesLinePerPage: 4,
        subtitlesLineHeight: 98,
        subtitlesZoomMeasurerSize: 10,
      },
    });
    return output;
  }
}
