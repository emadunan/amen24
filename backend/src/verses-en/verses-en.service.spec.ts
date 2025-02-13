import { Test, TestingModule } from '@nestjs/testing';
import { VersesEnService } from './verses-en.service';

describe('VersesEnService', () => {
  let service: VersesEnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersesEnService],
    }).compile();

    service = module.get<VersesEnService>(VersesEnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
