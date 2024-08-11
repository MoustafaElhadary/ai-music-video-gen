/* eslint-disable camelcase */

import { openai } from '@ai-sdk/openai';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  async processJobRequest(job: Job<GenerationRequest>) {
    this.logger.log(`Starting to process job ${job.id}`);
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
    await this.updateGenerationRequest(id, {
      status: RequestStatus.SUBTITLE_PROCESSING,
    });

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

    const { srt, language, is_rtl } = await this.ensureCaptionsMatchLyrics(
      generationRequest.sunoLyrics,
      generatedSRT,
    );

    // const srt = await this.getWordByWordSubtitles(generationRequest.sunoLyrics);
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
    const imageUrls = await Promise.all(
      imageDescriptions.map((desc) => this.generateImage(desc.prompt)),
    );

    await this.generationRequestService.addVideoImage(id, ...imageUrls);
    await this.updateGenerationRequest(id, {
      status: RequestStatus.IMAGE_PROCESSED,
    });
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

    const videoUrl = await this.uploadVideo(generationRequest.localVideoPath!);
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

  private async generateImageDescriptions(lyrics: string) {
    const prompt = `
    Given the following song lyrics, generate 5-7 image descriptions that capture key moments or themes from the song. 
    Each description should include a prompt for image generation and a timestamp (in seconds) for when the image should appear in the video.
    keep them fun and creative and imaginative.

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
          }),
        ),
      }),
      prompt,
      maxRetries: 3,
    });

    return result.object.imageDescriptions;
  }

  private async generateImage(prompt: string): Promise<string> {
    const output = await this.replicate.run(
      'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
      {
        input: {
          prompt,
          negative_prompt: 'blurry, low quality, distorted, deformed',
          width: 1024,
          height: 1024,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          refine: 'expert_ensemble_refiner',
          scheduler: 'K_EULER',
          lora_scale: 0.6,
          apply_watermark: false,
          high_noise_frac: 0.8,
          prompt_strength: 0.8,
        },
      },
    );

    if (Array.isArray(output) && output.length > 0) {
      return output[0] as string;
    }
    throw new Error('Failed to generate image');
  }
}
