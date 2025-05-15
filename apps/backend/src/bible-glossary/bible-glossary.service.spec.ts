import { Test, TestingModule } from '@nestjs/testing';
import { BibleGlossaryService } from './bible-glossary.service';

describe('BibleGlossaryService', () => {
  let service: BibleGlossaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BibleGlossaryService],
    }).compile();

    service = module.get<BibleGlossaryService>(BibleGlossaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
