/* eslint-disable max-params */

import { openai } from '@ai-sdk/openai';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GenerationRequest, RequestStatus } from '@prisma/client';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { VIDEO_QUEUE } from '@server/core/constants';
import { randomString } from '@server/core/utils';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { AudioGramSchema } from '@server/remotion/Composition';
import {
  CompositionId,
  getCompositionProps,
} from '@server/remotion/type-utils';
import { SunoApiService } from '@server/suno-api/suno-api.service';
import { AudioInfo } from '@server/suno-api/types';
import { generateObject } from 'ai';
import { type Job } from 'bull';
import * as fs from 'fs';
import path from 'path';
import { random } from 'remotion';
import { z } from 'zod';
import { Caption, convertToSRT } from './srt';
import { SupabaseService } from '@server/supabase/supabase.service';
import { ReplicateService } from '@server/replicate/replicate.service';

@Processor(VIDEO_QUEUE)
export class VideoQueueConsumer {
  constructor(
    private sunoApi: SunoApiService,
    private generationRequestService: GenerationRequestService,
    private supabaseService: SupabaseService,
    private replicateService: ReplicateService,
  ) {}

  private readonly logger = new Logger(VideoQueueConsumer.name);

  @Process()
  async processJobRequest(job: Job<GenerationRequest>) {
    this.logger.log(
      `Starting to process job ${job.id} for request ${job.data.id}`,
    );
    const { id } = job.data;

    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    try {
      await this.processAudio(id);
      await this.processSubtitles(id);
      await this.processImages(id);
      await this.processVideo(id);
      await this.uploadAndFinalize(id);

      this.logger.log(`Successfully processed job ${job.id}`);
      await job.remove();
      return generationRequest.finalVideoPath;
    } catch (error) {
      this.logger.error(`Error processing job ${job.id}:`, error);
      await this.updateGenerationRequest(id, { status: RequestStatus.FAILED });
      throw error;
    }
  }

  private async getGenerationRequest(id: string) {
    return this.generationRequestService.generationRequest({
      where: { id },
      include: { videoImages: true },
    });
  }

  private async updateGenerationRequest(
    id: string,
    data: Partial<GenerationRequest>,
  ) {
    return this.generationRequestService.updateGenerationRequest({
      where: { id },
      data,
    });
  }

  private async processAudio(id: string) {
    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.sunoAudioUrl) {
      this.logger.log('Audio already generated, skipping...');
      return;
    }

    const [audioInfo] = await this.sunoApi.generateAudio({
      prompt: generationRequest.prompt,
      make_instrumental: false,
      wait_audio: false,
    });

    if (!audioInfo || !audioInfo.id) {
      throw new Error('Failed to generate audio');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      sunoSongId: audioInfo.id,
      status: RequestStatus.AUDIO_PROCESSING,
    });

    const completedAudioInfo = await this.pollForAudioCompletion(audioInfo.id);

    await this.updateGenerationRequest(generationRequest.id, {
      sunoAudioUrl: completedAudioInfo.audio_url,
      duration: Number(completedAudioInfo.duration),
      sunoLyrics: completedAudioInfo.lyric,
      status: RequestStatus.AUDIO_PROCESSED,
    });
  }

  private async pollForAudioCompletion(audioId: string): Promise<AudioInfo> {
    const startTime = Date.now();
    while (Date.now() - startTime < 300000) {
      // 5 minutes timeout
      const [polledAudioInfo] = await this.sunoApi.getAudioInfo(audioId);
      if (
        polledAudioInfo &&
        polledAudioInfo.status === 'complete' &&
        polledAudioInfo.audio_url &&
        polledAudioInfo.duration &&
        polledAudioInfo.lyric
      ) {
        return polledAudioInfo;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, 5000 + random(null) * 5000);
      });
    }
    throw new Error('Audio generation timed out');
  }

  private async processSubtitles(id: string) {
    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.srt) {
      this.logger.log('Subtitles already generated, skipping...');
      return;
    }

    if (!generationRequest.sunoLyrics) {
      throw new Error('Lyrics not found');
    }
    if (!generationRequest.sunoAudioUrl) {
      throw new Error('Audio not found');
    }

    await this.updateGenerationRequest(id, {
      status: RequestStatus.SUBTITLE_PROCESSING,
    });

    const generatedSubtitles = await this.replicateService.generateSubtitles(
      generationRequest.sunoAudioUrl,
    );

    const generatedSRT = convertToSRT(
      (generatedSubtitles as { segments: Caption[] }).segments,
    );

    const { srt, language, is_rtl } = await this.ensureCaptionsMatchLyrics(
      generationRequest.sunoLyrics,
      generatedSRT,
    );

    if (!srt) {
      await this.updateGenerationRequest(generationRequest.id, {
        status: RequestStatus.SUBTITLE_FAILED,
      });
      throw new Error('Failed to get subtitles');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      srt,
      language,
      isRTL: is_rtl,
      status: RequestStatus.SUBTITLE_PROCESSED,
    });
  }

  private async processImages(id: string) {
    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest || !generationRequest.sunoLyrics) {
      throw new Error('Generation request or lyrics not found');
    }

    if (generationRequest.videoImages?.length > 5) {
      this.logger.log('Images already generated, skipping...');
      return;
    }

    await this.updateGenerationRequest(id, {
      status: RequestStatus.IMAGE_PROCESSING,
    });

    const imageDescriptions = await this.generateImageDescriptions(
      generationRequest.srt ?? generationRequest.sunoLyrics,
    );

    // Fetch uploaded images from Supabase storage
    const uploadedImages = await this.fetchUploadedImagesFromSupabase(id);

    const imageUrls = await Promise.all(
      imageDescriptions.map((desc, index) =>
        this.generateImage(desc.prompt, uploadedImages[index], desc.style_name),
      ),
    );

    await this.generationRequestService.addVideoImage(id, ...imageUrls);
    await this.updateGenerationRequest(id, {
      status: RequestStatus.IMAGE_PROCESSED,
    });
  }

  private async fetchUploadedImagesFromSupabase(
    generationRequestId: string,
  ): Promise<string[]> {
    return (
      await this.supabaseService.listFiles('user-uploads', generationRequestId)
    )
      ?.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
      ?.map(
        (file) =>
          this.supabaseService.getPublicUrl(
            'user-uploads',
            `${generationRequestId}/${file.name}`,
          ).data.publicUrl,
      );
  }

  private async generateImageDescriptions(lyrics: string) {
    const prompt = `
    Given the following song lyrics, generate 5-7 image descriptions that capture key moments or themes from the song. 
    Each description should include a prompt for image generation and a timestamp (in seconds) for when the image should appear in the video.
    Make the descriptions extremely fun, hilariously funny, intriguing, and interesting. Think outside the box and create unexpected, whimsical, and captivating scenes that will surprise and delight viewers.
    extremely fun, hilariously funny, deeply intriguing, eye-poppingly interesting, vibrant colors, unexpected elements, whimsical scene, surprising details
    Lyrics:
    ${lyrics}
    `;

    const result = await generateObject({
      model: openai('gpt-4'),
      schema: z.object({
        imageDescriptions: z.array(
          z.object({
            prompt: z.string(),
            startTime: z.number(),
            endTime: z.number(),
            style_name: z.enum([
              '(No style)',
              'Cinematic',
              'Disney Charactor',
              'Digital Art',
              'Photographic (Default)',
              'Fantasy art',
              'Neonpunk',
              'Enhance',
              'Comic book',
              'Lowpoly',
              'Line art',
            ]),
          }),
        ),
      }),
      prompt,
      maxRetries: 3,
    });

    return result.object.imageDescriptions;
  }

  private async generateImage(
    prompt: string,
    inputImage?: string,
    styleName?: string,
  ): Promise<string> {
    let output: string[];
    if (inputImage) {
      // Use PhotoMaker if we have an input image
      output = await this.replicateService.generateImageWithBasePhoto(
        prompt,
        inputImage,
        styleName,
      );
    } else {
      // Use SDXL if we don't have an input image
      output = await this.replicateService.generateImage(prompt);
    }

    if (Array.isArray(output) && output.length > 0 && output[0]) {
      return output[0];
    }
    throw new Error('Failed to generate image');
  }

  private async processVideo(id: string) {
    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.finalVideoPath) {
      this.logger.log('Video already generated, skipping...');
      return;
    }

    await this.updateGenerationRequest(id, {
      status: RequestStatus.VIDEO_PROCESSING,
    });

    const videoProps: z.infer<typeof AudioGramSchema> = {
      durationInSeconds: Number(generationRequest.duration!),
      audioOffsetInSeconds: 0,
      subtitlesFileName: generationRequest.srt!,
      audioFileName: generationRequest.sunoAudioUrl!,
      coverImgFileName:
        'https://github.com/remotion-dev/template-audiogram/blob/main/public/cover.jpg?raw=true', // TODO:Replace with actual cover image
      titleText: `A song for ${generationRequest.recipientName}`,
      titleColor: 'rgba(255, 255, 255, 0.9)',
      waveColor: '#a3a5ae',
      subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
      subtitlesLinePerPage: 5,
      subtitlesLineHeight: 60,
      subtitlesZoomMeasurerSize: 10,
      onlyDisplayCurrentSentence: false,
      mirrorWave: true,
      waveLinesToDisplay: 20,
      waveFreqRangeStartIndex: 4,
      waveNumberOfSamples: '256',
    };

    const videoPath = await this.createVideo(videoProps);
    if (!videoPath) {
      await this.updateGenerationRequest(generationRequest.id, {
        status: RequestStatus.VIDEO_FAILED,
      });
      throw new Error('Failed to create video');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      localVideoPath: videoPath,
      status: RequestStatus.VIDEO_PROCESSED,
    });
  }

  private async uploadAndFinalize(id: string) {
    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    if (generationRequest.finalVideoPath) {
      this.logger.log('Video already uploaded, skipping...');
      return;
    }

    if (!generationRequest.localVideoPath) {
      await this.updateGenerationRequest(generationRequest.id, {
        status: RequestStatus.UPLOAD_FAILED,
      });
      throw new Error('Video not found');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      status: RequestStatus.UPLOADING,
    });

    const videoUrl = await this.uploadVideo(generationRequest.localVideoPath);
    if (!videoUrl) {
      await this.updateGenerationRequest(generationRequest.id, {
        status: RequestStatus.UPLOAD_FAILED,
      });
      throw new Error('Failed to upload video');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      status: RequestStatus.COMPLETED,
      finalVideoPath: videoUrl,
    });
  }

  private async createVideo(props: z.infer<typeof AudioGramSchema>) {
    try {
      const compositionId: CompositionId = 'Audiogram';

      const serveUrl = await bundle({
        entryPoint: path.resolve('./src/remotion/index.ts'),
        webpackOverride: (config) => config,
      });

      const inputProps = getCompositionProps(compositionId, props);

      const composition = await selectComposition({
        serveUrl,
        id: compositionId,
        inputProps,
      });

      const outputLocation = `out/${compositionId}-${randomString(5)}.mp4`;
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

  private async uploadVideo(videoPath: string): Promise<string | undefined> {
    try {
      const fileContent = await fs.promises.readFile(videoPath);
      const filename = path.basename(videoPath);

      const data = await this.supabaseService.uploadFile(
        'songs',
        `public/${filename}`,
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

  private async ensureCaptionsMatchLyrics(lyrics: string, captions: string) {
    const prompt = `I have two inputs. one is the srt file with the words mapped to where i want them to be but they occasionally have the wrong words or something that sounds similar and i have what the words should be. 
    I will provide you both so you can fix the srt file for me 
    you can be assured that the I own the rights to the lyrics and the srt file.
   return back the COMPLETE srt file with the correct words. don't get lazy and only return the parts that need to be changed.
    correct lyrics: ${lyrics}
    captions: ${captions}
    `;

    const result = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        srt: z.string(),
        language: z
          .string()
          .describe('the language of the srt file. ex: en, es, fr, etc'),
        is_rtl: z.boolean().describe('is the language right to left'),
      }),
      prompt,
      maxRetries: 3,
    });

    return result.object;
  }
}
