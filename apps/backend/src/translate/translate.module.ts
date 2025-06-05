import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibreTranslateService } from './libre-translate/libre-translate.service';
import { TranslateController } from './translate.controller';
import { GoogleTranslateService } from './google-translate/google-translate.service';
import { QuotaTrackerModule } from 'src/quota-tracker/quota-tracker.module';

@Module({
  imports: [HttpModule, QuotaTrackerModule],
  providers: [LibreTranslateService, GoogleTranslateService],
  controllers: [TranslateController],
})
export class LibreTranslateModule {}
