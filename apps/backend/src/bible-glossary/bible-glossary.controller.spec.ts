import { Test, TestingModule } from '@nestjs/testing';
import { BibleGlossaryController } from './bible-glossary.controller';
import { BibleGlossaryService } from './bible-glossary.service';

describe('BibleGlossaryController', () => {
  let controller: BibleGlossaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibleGlossaryController],
      providers: [BibleGlossaryService],
    }).compile();

    controller = module.get<BibleGlossaryController>(BibleGlossaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
