import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Replicate, { WebhookEventType } from 'replicate';

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

  private async run(
    model: `${string}/${string}:${string}`,
    options: {
      input: object;
      wait?: { interval?: number };
      webhook?: string;
      webhook_events_filter?: WebhookEventType[];
      signal?: AbortSignal;
    },
  ) {
    return this.replicate.run(model, options);
  }

  async generateImageWithBasePhoto(prompt: string, inputImage: string) {
    return this.run(
      'tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4',
      {
        input: {
          prompt,
          num_steps: 50,
          style_name: 'Photographic (Default)',
          input_image: inputImage,
          num_outputs: 1,
          guidance_scale: 7.5,
          negative_prompt: this.photoNegativePrompt,
          style_strength_ratio: 35,
        },
      },
    );
  }

  async generateImage(prompt: string) {
    return this.run(
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

  async generateSubtitles(audio: string) {
    return this.run(
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
