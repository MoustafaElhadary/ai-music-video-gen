import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
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
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api/generate`, input),
    );
    return data;
  }

  async customGenerateAudio(
    input: CustomGenerateAudioDto,
  ): Promise<AudioInfo[]> {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api/custom_generate`, input),
    );
    return data;
  }

  async extendAudio(input: ExtendAudioDto): Promise<AudioInfo> {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api/extend_audio`, input),
    );
    return data;
  }

  async generateLyrics(
    input: GenerateLyricsDto,
  ): Promise<{ text: string; title: string; status: string }> {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api/generate_lyrics`, input),
    );
    console.log({ data });
    return data;
  }

  async getAudioInfo(ids?: string): Promise<AudioInfo[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/api/get`, { params: { ids } }),
    );
    return data;
  }

  async getQuotaInfo(): Promise<QuotaInfo> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/api/get_limit`),
    );
    return data;
  }

  async getClipInfo(id: string): Promise<AudioInfo> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/api/clip`, { params: { id } }),
    );
    return data;
  }

  async concatAudio(clipId: string): Promise<AudioInfo> {
    const { data } = await firstValueFrom(
      this.httpService.post(`${this.baseUrl}/api/concat`, { clip_id: clipId }),
    );
    return data;
  }
}
