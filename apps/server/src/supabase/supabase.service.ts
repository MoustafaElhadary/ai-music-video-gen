import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

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

  async saveJsonFile(
    bucket: string,
    path: string,
    data: unknown,
  ): Promise<{ id: string; path: string; fullPath: string }> {
    const jsonString = JSON.stringify(data);
    const file = Buffer.from(jsonString);
    const { data: uploadData, error } = await this.supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: 'application/json',
        upsert: true,
      });
    if (error) throw error;
    return uploadData;
  }

  async getValidatedObject<T extends z.ZodType>(
    bucket: string,
    path: string,
    schema: T,
  ): Promise<z.infer<T>> {
    try {
      // Download the file from Supabase storage
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .download(path);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from Supabase');
      }

      const text = await data.text();
      const jsonData: unknown = JSON.parse(text);

      // Explicitly type the validated data
      const validatedData: z.infer<T> = schema.parse(jsonData);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Validation error: ${error.errors.map((e) => e.message).join(', ')}`,
        );
      }
      if (error instanceof SyntaxError) {
        throw new Error(`JSON parsing error: ${error.message}`);
      }
      throw error;
    }
  }
}
