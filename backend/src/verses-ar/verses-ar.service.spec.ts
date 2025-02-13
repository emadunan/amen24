import { Test, TestingModule } from '@nestjs/testing';
import { VersesArService } from './verses-ar.service';

describe('VersesArService', () => {
  let service: VersesArService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersesArService],
    }).compile();

    service = module.get<VersesArService>(VersesArService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
