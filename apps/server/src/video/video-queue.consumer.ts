/* eslint-disable camelcase */

import { openai } from '@ai-sdk/openai';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerationRequest } from '@prisma/client';
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
import { createClient } from '@supabase/supabase-js';
import { generateObject } from 'ai';
import { type Job } from 'bull';
import * as fs from 'fs';
import path from 'path';
import { random } from 'remotion';
import Replicate from 'replicate';
import { z } from 'zod';
import { Caption, convertToSRT } from './srt';

@Processor(VIDEO_QUEUE)
export class VideoQueueConsumer {
  constructor(
    private configService: ConfigService,
    private sunoApi: SunoApiService,
    private generationRequestService: GenerationRequestService,
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
    const { id } = job.data;

    const generationRequest = await this.getGenerationRequest(id);
    if (!generationRequest) {
      throw new Error('Generation request not found');
    }

    try {
      await this.processAudio(id);
      await this.processSubtitles(id);
      await this.processVideo(id);
      await this.uploadAndFinalize(id);

      this.logger.log(`Successfully processed job ${job.id}`);
      return generationRequest.finalVideoPath;
    } catch (error) {
      this.logger.error(`Error processing job ${job.id}:`, error);
      await this.updateGenerationRequest(id, { status: 'FAILED' });
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
      status: 'PROCESSING',
    });

    const completedAudioInfo = await this.pollForAudioCompletion(audioInfo.id);

    await this.updateGenerationRequest(generationRequest.id, {
      sunoAudioUrl: completedAudioInfo.audio_url,
      duration: Number(completedAudioInfo.duration),
      sunoLyrics: completedAudioInfo.lyric,
    });
  }

  private async pollForAudioCompletion(audioId: string): Promise<AudioInfo> {
    const startTime = Date.now();
    while (Date.now() - startTime < 300000) {
      // 5 minutes timeout
      const [polledAudioInfo] = await this.sunoApi.getAudioInfo(audioId);
      if (
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

    const generatedSubtitles = await this.replicate.run(
      'openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
      {
        input: {
          audio: generationRequest.sunoAudioUrl!,
          model: 'large-v3',
          language: 'auto',
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

    const generatedSRT = convertToSRT(
      (generatedSubtitles as { segments: Caption[] }).segments,
    );

    const srt = await this.ensureCaptionsMatchLyrics(
      generationRequest.sunoLyrics,
      generatedSRT,
    );

    // const srt = await this.getWordByWordSubtitles(generationRequest.sunoLyrics);
    if (!srt) {
      throw new Error('Failed to get subtitles');
    }

    await this.updateGenerationRequest(generationRequest.id, { srt });
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
      throw new Error('Failed to create video');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      localVideoPath: videoPath,
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
      throw new Error('Video not found');
    }

    const videoUrl = await this.uploadVideo(generationRequest.localVideoPath!);
    if (!videoUrl) {
      throw new Error('Failed to upload video');
    }

    await this.updateGenerationRequest(generationRequest.id, {
      status: 'COMPLETED',
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

  private async uploadVideo(videoPath: string) {
    try {
      // Read the file content
      console.log({ videoPath });
      const fileContent = await fs.promises.readFile(videoPath);
      // Generate a unique filename for the uploaded video
      const filename = path.basename(videoPath);

      const { data, error } = await this.supabase.storage
        .from('songs')
        .upload(`public/${filename}`, fileContent, {
          contentType: 'video/mp4',
        });

      console.log({ error });
      console.log({ data });

      return data?.fullPath;
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async ensureCaptionsMatchLyrics(lyrics: string, captions: string) {
    const prompt = `You are a helpful assistant that ensures the captions match the lyrics. 
    we  have two inputs. 
    one is the srt file with the words mapped to where i want them to be but they occasionally have the wrong words or 
    something that sounds similar and i have what the words should be. 
    you can be assured that the user owns the rights to the lyrics and the srt file.
    the user will provide you both so you can fix the srt file for me.
   return back the COMPLETE srt file with the correct words. don't get lazy and only return the parts that need to be changed.
    correct lyrics: ${lyrics}
    captions: ${captions}
    `;

    const result = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        srt: z.string().describe(`the srt file with the correct words, 
          in the format of 
          1
          00:00:01,000 --> 00:00:01,000
          lyrics
          2
          00:00:02,000 --> 00:00:02,000
          lyrics
          `),
      }),
      prompt,
      maxRetries: 3,
    });

    return result.object.srt;
  }
}
