import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get('SUPABASE_URL') ?? '',
      this.configService.get('SUPABASE_ANON_KEY') ?? '',
    );
  }

  async uploadFile(
    bucket: string,
    path: string,
    file: Buffer,
    options?: {
      cacheControl?: string;
      contentType?: string;
      upsert?: boolean;
      duplex?: string;
    },
  ) {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, options);
    if (error) throw error;
    return data;
  }

  async listFiles(bucket: string, path: string) {
    const { data, error } = await this.supabase.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  }

  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path);
  }

  async deleteFile(bucket: string, path: string) {
    const obj = await this.supabase.storage.from(bucket).remove([path]);
    if (obj.error) throw obj.error;
    return obj;
  }

  async getFileUrl(bucket: string, path: string) {
    const obj = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600);
    if (obj.error) throw obj.error;
    return obj;
  }
}
