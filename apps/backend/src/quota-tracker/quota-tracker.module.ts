import { Module } from '@nestjs/common';
import { QuotaTrackerService } from './quota-tracker.service';

@Module({
  providers: [QuotaTrackerService],
  exports: [QuotaTrackerService]
})
export class QuotaTrackerModule {}
