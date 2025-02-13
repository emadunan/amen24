import { Test, TestingModule } from '@nestjs/testing';
import { VersesArController } from './verses-ar.controller';
import { VersesArService } from './verses-ar.service';

describe('VersesArController', () => {
  let controller: VersesArController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersesArController],
      providers: [VersesArService],
    }).compile();

    controller = module.get<VersesArController>(VersesArController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
