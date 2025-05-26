import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibreTranslateService } from './libre-translate.service';
import { LibreTranslateController } from './libre-translate.controller';

@Module({
  imports: [HttpModule],
  providers: [LibreTranslateService],
  controllers: [LibreTranslateController]
})
export class LibreTranslateModule {}
