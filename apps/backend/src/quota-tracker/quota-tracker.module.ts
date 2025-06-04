import { Module } from '@nestjs/common';
import { QuotaTrackerService } from './quota-tracker.service';
import { QuotaTrackerController } from './quota-tracker.controller';

@Module({
  providers: [QuotaTrackerService],
  exports: [QuotaTrackerService],
  controllers: [QuotaTrackerController]
})
export class QuotaTrackerModule {}
