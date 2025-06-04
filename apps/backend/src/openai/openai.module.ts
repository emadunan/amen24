import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { QuotaTrackerModule } from 'src/quota-tracker/quota-tracker.module';

@Module({
  imports: [QuotaTrackerModule],
  providers: [OpenAiService],
  exports: [OpenAiService]
})
export class OpenAiModule { }
