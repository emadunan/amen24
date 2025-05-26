import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibreTranslateService } from './libre-translate/libre-translate.service';
import { TranslateController } from './translate.controller';
import { GoogleTranslateService } from './google-translate/google-translate.service';

@Module({
  imports: [HttpModule],
  providers: [LibreTranslateService, GoogleTranslateService],
  controllers: [TranslateController],
})
export class LibreTranslateModule {}
