import { Test, TestingModule } from '@nestjs/testing';
import { LibreTranslateController } from './libre-translate.controller';

describe('LibreTranslateController', () => {
  let controller: LibreTranslateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibreTranslateController],
    }).compile();

    controller = module.get<LibreTranslateController>(LibreTranslateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
