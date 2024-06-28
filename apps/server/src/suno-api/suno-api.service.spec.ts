import { Test, TestingModule } from '@nestjs/testing';
import { SunoApiService } from './suno-api.service';

describe('SunoApiService', () => {
  let service: SunoApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SunoApiService],
    }).compile();

    service = module.get<SunoApiService>(SunoApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
