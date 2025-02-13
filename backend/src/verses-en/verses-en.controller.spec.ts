import { Test, TestingModule } from '@nestjs/testing';
import { VersesEnController } from './verses-en.controller';
import { VersesEnService } from './verses-en.service';

describe('VersesEnController', () => {
  let controller: VersesEnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersesEnController],
      providers: [VersesEnService],
    }).compile();

    controller = module.get<VersesEnController>(VersesEnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
