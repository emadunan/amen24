import { Controller, Get, Param } from '@nestjs/common';
import { QuotaTrackerService } from './quota-tracker.service';
import { ConfigService } from '@nestjs/config';

type ServiceProvider = 'openai' | 'google-translate';

@Controller('quota-tracker')
export class QuotaTrackerController {
  constructor(
    private readonly quotaTrackerService: QuotaTrackerService,
    private readonly configService: ConfigService,
  ) { }

  @Get(':provider')
  async getOpenAiQuota(@Param('provider') provider: ServiceProvider) {
    const value = await this.quotaTrackerService.getUsage(provider);
    const max = Number(this.configService.get('OPENAI_MONTHLY_LIMIT') ?? 3000000);
    return { value, max };
  }
}
