import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { TRANSCODE_QUEUE } from '@server/core/constants';
import { randomString } from '@server/core/utils';
import { createClient } from '@supabase/supabase-js';
import { Job } from 'bull';
import path from 'path';
import Replicate from 'replicate';
import { Caption, convertToSRT } from './srt';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(TranscodeConsumer.name);

  replicate = new Replicate({
    auth: this.configService.get('REPLICATE_API_TOKEN'),
  });

  private supabase = createClient(
    this.configService.get('SUPABASE_URL') ?? '',
    this.configService.get('SUPABASE_ANON_KEY') ?? '',
  );

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log('Start transcoding...');
    const audioUrl =
      'https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-5.mp3';
    const srt = await this.getWordByWordSubtitles(audioUrl);

    if (!srt) {
      this.logger.error('Failed to get subtitles');
      return;
    }

    const videoPath = await this.createVideo(srt, audioUrl);
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
      const compositionId = 'Audiogram';

      // You only have to create a bundle once, and you may reuse it
      // for multiple renders that you can parametrize using input props.
      const serveUrl = await bundle({
        entryPoint: path.resolve('./src/remotion/index.ts'),
        webpackOverride: (config) => config,
      });

      console.log({ serveUrl });

      // Parametrize the video by passing props to your component.
      const inputProps = {
        subtitlesFileName,
        audioFileName,
      };

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

      return `${path.resolve(outputLocation)}`;
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async uploadVideo(videoPath: string) {
    try {
      const { data, error } = await this.supabase.storage
        .from('songs')
        .upload(`public/${videoPath}`, videoPath);

      console.log({ data, error });

      // const { url } = await this.replicate.upload(videoPath);
      // return url;
      return videoPath;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
