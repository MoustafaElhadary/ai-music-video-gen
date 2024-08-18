import { Module } from '@nestjs/common';
import type { DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SunoApiService } from './suno-api.service';

@Module({})
export class SunoApiModule {
  static register(): DynamicModule {
    return {
      module: SunoApiModule,
      imports: [HttpModule],
      providers: [SunoApiService],
      exports: [SunoApiService],
    };
  }
}
