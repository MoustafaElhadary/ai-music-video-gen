import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TRANSCODE_QUEUE } from '@server/core/constants';
import { Job } from 'bull';
import Replicate from 'replicate';
import { Caption, CaptionSchema, convertToSRT } from './srt';
import { z } from 'zod';

@Processor(TRANSCODE_QUEUE)
export class TranscodeConsumer {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(TranscodeConsumer.name);

  replicate = new Replicate({
    auth: this.configService.get('REPLICATE_API_TOKEN'),
  });

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.log('Start transcoding...');
    await this.getWordByWordSubtitles(
      'https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-5.mp3',
    );
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
}
