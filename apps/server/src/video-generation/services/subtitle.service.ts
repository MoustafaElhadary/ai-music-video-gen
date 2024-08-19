import { openai } from '@ai-sdk/openai';
import { Injectable, Logger } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { ReplicateService } from '@server/replicate/replicate.service';
import { convertToSRT } from '@server/video-generation/srt';
import { generateObject } from 'ai';
import { z } from 'zod';

@Injectable()
export class SubtitleService {
  private readonly logger = new Logger(SubtitleService.name);

  constructor(
    private generationRequestService: GenerationRequestService,
    private replicateService: ReplicateService,
  ) {}

  async processSubtitles(id: string): Promise<void> {
    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
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

    await this.generationRequestService.simpleUpdate(id, {
      status: RequestStatus.SUBTITLE_PROCESSING,
    });

    const generatedSubtitles = await this.replicateService.generateSubtitles(
      generationRequest.sunoAudioUrl,
    );

    const generatedSRT = convertToSRT(generatedSubtitles.segments);

    const { srt, language, is_rtl } = await this.ensureCaptionsMatchLyrics(
      generationRequest.sunoLyrics,
      generatedSRT,
    );

    if (!srt) {
      await this.generationRequestService.simpleUpdate(generationRequest.id, {
        status: RequestStatus.SUBTITLE_FAILED,
      });
      throw new Error('Failed to get subtitles');
    }

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
      srt,
      language,
      isRTL: is_rtl,
      status: RequestStatus.SUBTITLE_PROCESSED,
    });
  }

  AiCaptionSchema = z.object({
    srt: z.string(),
    language: z
      .string()
      .describe('the language of the srt file. ex: en, es, fr, etc'),
    is_rtl: z.boolean().describe('is the language right to left'),
  });

  private async ensureCaptionsMatchLyrics(
    lyrics: string,
    captions: string,
  ): Promise<z.infer<typeof this.AiCaptionSchema>> {
    const prompt = `We have two inputs. 
    one is the srt file with the words mapped to where we want them to be but they occasionally have the wrong words or something that sounds similar 
    and we have what the correct words should be. 
    you will be provided both so you can fix the srt file for me 
    you can be assured that the I own the rights to the lyrics and the srt file.
   return back the COMPLETE srt file with the correct words. don't get lazy and only return the parts that need to be changed.
   don't  get lazy and just write Music or something similar. default to the original words if you are not sure.
    correct lyrics: ${lyrics}
    captions: ${captions}
    `;

    const result = await generateObject({
      model: openai('gpt-4o'),
      schema: this.AiCaptionSchema,
      prompt,
      maxRetries: 3,
    });

    return result.object;
  }
}
