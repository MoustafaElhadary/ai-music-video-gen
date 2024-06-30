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
  id: string; // Unique identifier for the audio
  title?: string; // Title of the audio
  image_url?: string; // URL of the image associated with the audio
  lyric?: string; // Lyrics of the audio
  audio_url?: string; // URL of the audio file
  video_url?: string; // URL of the video associated with the audio
  created_at: string; // Date and time when the audio was created
  model_name: string; // Name of the model used for audio generation
  gpt_description_prompt?: string; // Prompt for GPT description
  prompt?: string; // Prompt for audio generation
  status: string; // Status
  type?: string;
  tags?: string; // Genre of music.
  duration?: string; // Duration of the audio
  error_message?: string; // Error message if any
}

export interface QuotaInfo {
  credits_left: number;
  period: string;
  monthly_limit: number;
  monthly_usage: number;
}
