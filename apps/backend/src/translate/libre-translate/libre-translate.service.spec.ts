import { Test, TestingModule } from '@nestjs/testing';
import { LibreTranslateService } from './libre-translate.service';

describe('LibreTranslateService', () => {
  let service: LibreTranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibreTranslateService],
    }).compile();

    service = module.get<LibreTranslateService>(LibreTranslateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
