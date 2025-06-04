import { Test, TestingModule } from '@nestjs/testing';
import { QuotaTrackerController } from './quota-tracker.controller';

describe('QuotaTrackerController', () => {
  let controller: QuotaTrackerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotaTrackerController],
    }).compile();

    controller = module.get<QuotaTrackerController>(QuotaTrackerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
