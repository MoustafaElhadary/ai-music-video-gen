import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Caption } from '@server/video-generation/srt';
import Replicate, { WebhookEventType } from 'replicate';

interface Output {
  segments: Caption[];
  translation: string | null;
  transcription: string;
  detected_language: string;
}

@Injectable()
export class ReplicateService {
  readonly photoNegativePrompt =
    'boring, plain, dull, uninteresting, low quality, blurry, distorted, ordinary, expected';

  private replicate: Replicate;

  constructor(private configService: ConfigService) {
    this.replicate = new Replicate({
      auth: this.configService.get('REPLICATE_API_TOKEN'),
    });
  }

  private async run<T>(
    model: `${string}/${string}:${string}`,
    options: {
      input: object;
      wait?: { interval?: number };
      webhook?: string;
      webhook_events_filter?: WebhookEventType[];
      signal?: AbortSignal;
    },
  ): Promise<T> {
    return this.replicate.run(model, options) as Promise<T>;
  }

  // type InputSchemaType = z.infer<typeof InputSchema>;
  async generateImageWithBasePhoto(
    prompt: string,
    inputImage: string,
    styleName: string = 'Photographic (Default)',
  ): Promise<string[]> {
    return this.run<string[]>(
      'tencentarc/photomaker-style:467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769',
      {
        input: {
          num_steps: 50,
          guidance_scale: 5,
          prompt,
          style_name: styleName,
          input_image: inputImage,
          num_outputs: 1,
          negative_prompt: this.photoNegativePrompt,
          style_strength_ratio: 35,
        },
      },
    );
  }

  async generateImage(prompt: string): Promise<string[]> {
    return this.run<string[]>(
      'stability-ai/sdxl:7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
      {
        input: {
          width: 1024,
          height: 1024,
          prompt,
          refine: 'expert_ensemble_refiner',
          scheduler: 'K_EULER',
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: false,
          high_noise_frac: 0.8,
          negative_prompt: this.photoNegativePrompt,
          prompt_strength: 0.8,
          num_inference_steps: 50,
        },
      },
    );
  }

  async generateSubtitles(audio: string): Promise<Output> {
    return this.run<Output>(
      'openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
      {
        input: {
          audio,
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
  }
}
