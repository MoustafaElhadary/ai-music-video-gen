import { Module, DynamicModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SunoApiService } from './suno-api.service';
import { ConfigModule } from '@nestjs/config';

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
