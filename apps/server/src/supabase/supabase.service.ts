import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Bucket {
  id: string;
  name: string;
  owner: string;
  file_size_limit?: number;
  allowed_mime_types?: string[];
  created_at: string;
  updated_at: string;
  public: boolean;
}

export interface FileObject {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, unknown>;
  buckets: Bucket;
}
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
  ): Promise<{ id: string; path: string; fullPath: string }> {
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, options);
    if (error) throw error;
    return data;
  }

  async listFiles(bucket: string, path: string): Promise<FileObject[]> {
    const { data, error } = await this.supabase.storage.from(bucket).list(path);
    if (error) throw error;
    return data;
  }

  getPublicUrl(
    bucket: string,
    path: string,
  ): {
    data: {
      publicUrl: string;
    };
  } {
    return this.supabase.storage.from(bucket).getPublicUrl(path);
  }

  async deleteFile(
    bucket: string,
    path: string,
  ): Promise<{
    data: FileObject[];
    error: null;
  }> {
    const obj = await this.supabase.storage.from(bucket).remove([path]);
    if (obj.error) throw obj.error;
    return obj;
  }

  async getFileUrl(
    bucket: string,
    path: string,
  ): Promise<{
    data: {
      signedUrl: string;
    };
    error: null;
  }> {
    const obj = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600);
    if (obj.error) throw obj.error;
    return obj;
  }
}
