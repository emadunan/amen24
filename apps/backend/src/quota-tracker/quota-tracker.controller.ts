import { Controller, Get, Param } from '@nestjs/common';
import { QuotaTrackerService } from './quota-tracker.service';

type ServiceProvider = 'openai' | 'google-translate';

const MONTHLY_QUOTA_LIMIT = {
  openai: 3_000_000,
  "google-translate": 500_000,
}

@Controller('quota-tracker')
export class QuotaTrackerController {
  constructor(
    private readonly quotaTrackerService: QuotaTrackerService,
  ) { }

  @Get(':provider')
  async getOpenAiQuota(@Param('provider') provider: ServiceProvider) {
    const value = await this.quotaTrackerService.getUsage(provider);
    const max = Number(MONTHLY_QUOTA_LIMIT[provider]);
    return { value, max };
  }
}
