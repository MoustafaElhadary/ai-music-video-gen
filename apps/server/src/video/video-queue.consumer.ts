/* eslint-disable camelcase */

import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerationRequest } from '@prisma/client';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { VIDEO_QUEUE } from '@server/core/constants';
import { randomString } from '@server/core/utils';
import { PrismaService } from '@server/prisma/prisma.service';
import { AudioGramSchema } from '@server/remotion/Composition';
import {
  CompositionId,
  getCompositionProps,
} from '@server/remotion/type-utils';
import { SunoApiService } from '@server/suno-api/suno-api.service';
import { createClient } from '@supabase/supabase-js';
import { type Job } from 'bull';
import * as fs from 'fs';
import path from 'path';
import Replicate from 'replicate';
import { z } from 'zod';
import { Caption, convertToSRT } from './srt';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { AudioInfo } from '@server/suno-api/types';

@Processor(VIDEO_QUEUE)
export class VideoQueueConsumer {
  constructor(
    private configService: ConfigService,
    private sunoApi: SunoApiService,
    private generationRequestService: GenerationRequestService,
    private prisma: PrismaService,
  ) {}

  private readonly logger = new Logger(VideoQueueConsumer.name);

  replicate = new Replicate({
    auth: this.configService.get('REPLICATE_API_TOKEN'),
  });

  private supabase = createClient(
    this.configService.get('SUPABASE_URL') ?? '',
    this.configService.get('SUPABASE_ANON_KEY') ?? '',
  );

  @Process()
  async transcode(job: Job<GenerationRequest>) {
    this.logger.log(`Starting to process job ${job.id}`);
    const { id, prompt, recipientName } = job.data;

    try {
      // 1. Generate audio using Suno API
      const [audioInfo] = await this.sunoApi.generateAudio({
        prompt,
        make_instrumental: false,
        wait_audio: false,
      });

      if (!audioInfo || !audioInfo.id) {
        throw new Error('Failed to generate audio');
      }

      // Update GenerationRequest with Suno song ID
      await this.generationRequestService.updateGenerationRequest({
        where: { id },
        data: { sunoSongId: audioInfo.id, status: 'PROCESSING' },
      });

      // Poll for audio completion
      let completedAudioInfo: AudioInfo | null = null;
      const startTime = Date.now();
      while (Date.now() - startTime < 300000) {
        // 5 minutes timeout
        const [polledAudioInfo] = await this.sunoApi.getAudioInfo(audioInfo.id);
        if (
          polledAudioInfo.status === 'complete' &&
          polledAudioInfo.audio_url &&
          polledAudioInfo.duration
        ) {
          completedAudioInfo = polledAudioInfo;
          break;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 5000 + Math.random() * 5000),
        ); // Wait 5-10 seconds
      }

      if (!completedAudioInfo || !completedAudioInfo.audio_url) {
        throw new Error('Audio generation timed out');
      }

      console.log('audioInfo', completedAudioInfo);

      // 2. Get word-by-word subtitles
      const subtitles = await this.getWordByWordSubtitles(
        completedAudioInfo.audio_url,
      );
      if (!subtitles) {
        throw new Error('Failed to get subtitles');
      }
      console.log('subtitles length', subtitles.length);
      console.log('subtitles first 100 characters', subtitles.slice(0, 100));

      // 3. Create video
      const videoProps: z.infer<typeof AudioGramSchema> = {
        durationInSeconds: Number(completedAudioInfo.duration),
        audioOffsetInSeconds: 0,
        subtitlesFileName: subtitles,
        audioFileName: completedAudioInfo.audio_url,
        coverImgFileName:
          'https://github.com/remotion-dev/template-audiogram/blob/main/public/cover.jpg?raw=true', // TODO:Replace with actual cover image
        titleText: `A song for ${recipientName}`,
        titleColor: 'rgba(255, 255, 255, 0.9)',
        waveColor: '#a3a5ae',
        subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
        subtitlesLinePerPage: 2,
        subtitlesLineHeight: 60,
        subtitlesZoomMeasurerSize: 10,
        onlyDisplayCurrentSentence: true,
        mirrorWave: true,
        waveLinesToDisplay: 20,
        waveFreqRangeStartIndex: 4,
        waveNumberOfSamples: '256',
      };

      const videoPath = await this.createVideo(videoProps);
      if (!videoPath) {
        throw new Error('Failed to create video');
      }
      console.log('videoPath', videoPath);

      // 4. Upload video to Supabase storage
      const videoUrl = await this.uploadVideo(videoPath);
      if (!videoUrl) {
        throw new Error('Failed to upload video');
      }

      this.logger.log('Video URL:', videoUrl);

      // 5. Update the generation request with the video URL
      await this.generationRequestService.updateGenerationRequest({
        where: { id },
        data: {
          status: 'COMPLETED',
          finalVideoPath: videoUrl,
        },
      });

      this.logger.log(`Successfully processed job ${job.id}`);
      return videoUrl;
    } catch (error) {
      this.logger.error(`Error processing job ${job.id}:`, error);
      await this.generationRequestService.updateGenerationRequest({
        where: { id },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  }

  // Helper method to update the generation request

  // Update the createVideo method to accept AudioGramSchema props
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

  private async getWordByWordSubtitles(audioUrl: string) {
    try {
      const output = await this.replicate.run(
        'openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
        {
          input: {
            audio: audioUrl,
            model: 'large-v3',
            language: 'en',
            translate: false,
            temperature: 0,
            transcription: 'srt',
            suppress_tokens: '-1',
            logprob_threshold: -1,
            no_speech_threshold: 0.6,
            condition_on_previous_text: true,
            compression_ratio_threshold: 2.4,
            temperature_increment_on_fallback: 0.2,
          },
        },
      );

      return convertToSRT((output as { segments: Caption[] }).segments);
    } catch (error) {
      this.logger.log('error', error);
    }
  }

  private async uploadVideo(videoPath: string) {
    try {
      // Read the file content
      const fileContent = await fs.promises.readFile(videoPath);

      // Generate a unique filename for the uploaded video
      const filename = path.basename(videoPath);

      const { data, error } = await this.supabase.storage
        .from('songs')
        .upload(`public/${filename}`, fileContent, {
          contentType: 'video/mp4',
        });

      console.log({ data, error });

      return videoPath;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
