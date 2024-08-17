import { Injectable, Logger } from '@nestjs/common';
import { RequestStatus } from '@prisma/client';
import { GenerationRequestService } from '@server/generation-request/generation-request.service';
import { SunoApiService } from '@server/suno-api/suno-api.service';
import { AudioInfo } from '@server/suno-api/types';
import { random } from 'remotion';

@Injectable()
export class AudioService {
  private readonly logger = new Logger(AudioService.name);

  constructor(
    private generationRequestService: GenerationRequestService,
    private sunoApi: SunoApiService,
  ) {}

  async processAudio(id: string): Promise<void> {
    const generationRequest =
      await this.generationRequestService.requestByIdWithImages(id);
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

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
      sunoSongId: audioInfo.id,
      status: RequestStatus.AUDIO_PROCESSING,
    });

    const completedAudioInfo = await this.pollForAudioCompletion(audioInfo.id);

    await this.generationRequestService.simpleUpdate(generationRequest.id, {
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
}
