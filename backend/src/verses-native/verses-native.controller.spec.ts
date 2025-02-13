import { Test, TestingModule } from '@nestjs/testing';
import { VersesNativeController } from './verses-native.controller';
import { VersesNativeService } from './verses-native.service';

describe('VersesNativeController', () => {
  let controller: VersesNativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersesNativeController],
      providers: [VersesNativeService],
    }).compile();

    controller = module.get<VersesNativeController>(VersesNativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
