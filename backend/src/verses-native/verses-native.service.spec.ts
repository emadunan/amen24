import { Test, TestingModule } from '@nestjs/testing';
import { VersesNativeService } from './verses-native.service';

describe('VersesNativeService', () => {
  let service: VersesNativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersesNativeService],
    }).compile();

    service = module.get<VersesNativeService>(VersesNativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
