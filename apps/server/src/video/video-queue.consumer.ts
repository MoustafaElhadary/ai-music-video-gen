import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { testVideoData, VIDEO_QUEUE } from '@server/core/constants';
import { randomString } from '@server/core/utils';
import {
  CompositionId,
  getCompositionProps,
} from '@server/remotion/type-utils';
import { createClient } from '@supabase/supabase-js';
import { type Job } from 'bull';
import * as fs from 'fs';
import path from 'path';
import Replicate from 'replicate';
import { Caption, convertToSRT } from './srt';
import { SunoApiService } from '@server/suno-api/suno-api.service';

@Processor(VIDEO_QUEUE)
export class VideoQueueConsumer {
  constructor(
    private configService: ConfigService,
    private sunoApi: SunoApiService,
  ) {}

  private readonly logger = new Logger(VideoQueueConsumer.name);

  replicate = new Replicate({
    auth: this.configService.get('REPLICATE_API_TOKEN'),
  });

  private supabase = createClient(
    this.configService.get('SUPABASE_URL') ?? '',
    this.configService.get('SUPABASE_ANON_KEY') ?? '',
  );

  /**
   * 1. Get audio file from suno api. send prompt of what the user wants
   * 2. Get word by word subtitles from openai whisper
   * 3. create prompts for each section in the lyrics that are witty, engaging and funny
   * 4. Get images from replicate for each section
   * 5. Grab some gifs from giphy for each section
   */

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log('Start transcoding...');

    const song = (
      await this.sunoApi.getAudioInfo('3d781725-b005-48c7-9af9-4b75325e0719')
    )[0];

    const { duration, audio_url } = song;
    console.log({ song });

    if (!audio_url || !duration) {
      this.logger.error('Failed to get audio');
      return;
    }

    const subtitles = await this.getWordByWordSubtitles(audio_url);

    console.log({ subtitles });

    if (!subtitles) {
      this.logger.error('Failed to get subtitles');
      return;
    }

    const videoPath = await this.createVideo(subtitles, audio_url);
    if (!videoPath) {
      this.logger.error('Failed to create video');
      return;
    }

    const videoUrl = await this.uploadVideo(videoPath);

    this.logger.log('Video URL:', videoUrl);
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

  private async createVideo(subtitlesFileName: string, audioFileName: string) {
    try {
      const compositionId: CompositionId = 'GeneratedVideo';

      // You only have to create a bundle once, and you may reuse it
      // for multiple renders that you can parametrize using input props.
      const serveUrl = await bundle({
        entryPoint: path.resolve('./src/remotion/index.ts'),
        webpackOverride: (config) => config,
      });

      console.log({ serveUrl });

      // const inputProps = getCompositionProps(compositionId, {
      //   // Audio settings
      //   audioOffsetInSeconds: 2,
      //   // Title settings
      //   audioFileName,
      //   coverImgFileName:
      //     'https://github.com/remotion-dev/template-audiogram/blob/main/public/cover.jpg?raw=true',
      //   titleText: '#234 – Test 123',
      //   titleColor: 'rgba(186, 186, 186, 0.93)',
      //   // Subtitles settings
      //   subtitlesFileName,
      //   onlyDisplayCurrentSentence: true,
      //   subtitlesTextColor: 'rgba(255, 255, 255, 0.93)',
      //   subtitlesLinePerPage: 4,
      //   subtitlesZoomMeasurerSize: 10,
      //   subtitlesLineHeight: 98,

      //   // Wave settings
      //   waveColor: '#a3a5ae',
      //   waveFreqRangeStartIndex: 7,
      //   waveLinesToDisplay: 29,
      //   waveNumberOfSamples: '256', // This is string for Remotion controls and will be converted to a number
      //   mirrorWave: true,
      //   durationInSeconds: 29.5,
      // });

      const inputProps = getCompositionProps(compositionId, {
        data: testVideoData,
      });

      // Get the composition you want to render. Pass `inputProps` if you
      // want to customize the duration or other metadata.
      const composition = await selectComposition({
        serveUrl,
        id: compositionId,
        inputProps,
      });

      // Render the video. Pass the same `inputProps` again
      // if your video is parametrized with data.
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
      this.logger.error(error);
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
