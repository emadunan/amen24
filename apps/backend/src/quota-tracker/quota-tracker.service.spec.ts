import { Test, TestingModule } from '@nestjs/testing';
import { QuotaTrackerService } from './quota-tracker.service';

describe('QuotaTrackerService', () => {
  let service: QuotaTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotaTrackerService],
    }).compile();

    service = module.get<QuotaTrackerService>(QuotaTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
