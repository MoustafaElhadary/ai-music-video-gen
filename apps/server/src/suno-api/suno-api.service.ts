import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type {
  GenerateAudioDto,
  CustomGenerateAudioDto,
  ExtendAudioDto,
  GenerateLyricsDto,
  AudioInfo,
  QuotaInfo,
} from './types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SunoApiService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = `${this.configService.get<string>('SUNO_API')}`;
  }

  async generateAudio(input: GenerateAudioDto): Promise<AudioInfo[]> {
    const response = await firstValueFrom(
      this.httpService.post<AudioInfo[]>(`${this.baseUrl}/api/generate`, input),
    );
    return response.data;
  }

  async customGenerateAudio(
    input: CustomGenerateAudioDto,
  ): Promise<AudioInfo[]> {
    const response = await firstValueFrom(
      this.httpService.post<AudioInfo[]>(
        `${this.baseUrl}/api/custom_generate`,
        input,
      ),
    );
    return response.data;
  }

  async extendAudio(input: ExtendAudioDto): Promise<AudioInfo> {
    const response = await firstValueFrom(
      this.httpService.post<AudioInfo>(
        `${this.baseUrl}/api/extend_audio`,
        input,
      ),
    );
    return response.data;
  }

  async generateLyrics(
    input: GenerateLyricsDto,
  ): Promise<{ text: string; title: string; status: string }> {
    const response = await firstValueFrom(
      this.httpService.post<{ text: string; title: string; status: string }>(
        `${this.baseUrl}/api/generate_lyrics`,
        input,
      ),
    );
    return response.data;
  }

  async getAudioInfo(ids?: string): Promise<AudioInfo[]> {
    const response = await firstValueFrom(
      this.httpService.get<AudioInfo[]>(`${this.baseUrl}/api/get`, {
        params: { ids },
      }),
    );
    return response.data;
  }

  async getQuotaInfo(): Promise<QuotaInfo> {
    const response = await firstValueFrom(
      this.httpService.get<QuotaInfo>(`${this.baseUrl}/api/get_limit`),
    );
    return response.data;
  }

  async getClipInfo(id: string): Promise<AudioInfo> {
    const response = await firstValueFrom(
      this.httpService.get<AudioInfo>(`${this.baseUrl}/api/clip`, {
        params: { id },
      }),
    );
    return response.data;
  }

  async concatAudio(clipId: string): Promise<AudioInfo> {
    const response = await firstValueFrom(
      this.httpService.post<AudioInfo>(`${this.baseUrl}/api/concat`, {
        clip_id: clipId,
      }),
    );
    return response.data;
  }
}
