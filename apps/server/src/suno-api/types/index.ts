export interface GenerateAudioDto {
  prompt: string;
  make_instrumental: boolean;
  model?: string;
  wait_audio?: boolean;
}

export interface CustomGenerateAudioDto {
  prompt: string;
  tags: string;
  title: string;
  make_instrumental?: boolean;
  model?: string;
  wait_audio?: boolean;
}

export interface ExtendAudioDto {
  audio_id: string;
  prompt?: string;
  continue_at?: string;
  title?: string;
  tags?: string;
  model?: string;
}

export interface GenerateLyricsDto {
  prompt: string;
}

export interface AudioInfo {
  id: string;
  title: string;
  image_url: string;
  lyric: string;
  audio_url: string;
  video_url: string;
  created_at: string;
  model_name: string;
  status: string;
  gpt_description_prompt: string;
  prompt: string;
  type: string;
  tags: string;
}

export interface QuotaInfo {
  credits_left: number;
  period: string;
  monthly_limit: number;
  monthly_usage: number;
}
