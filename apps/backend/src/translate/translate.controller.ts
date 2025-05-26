import { Body, Controller, Post } from '@nestjs/common';
import { LibreTranslateService } from './libre-translate/libre-translate.service';
import { GoogleTranslateService } from './google-translate/google-translate.service';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateService: GoogleTranslateService) { }

  @Post()
  async translate(@Body() body: { text: string; source?: string; target: string }) {
    const translatedText = await this.translateService.translate(
      body.text,
      body.source || 'auto',
      body.target
    );

    return { translatedText };
  }
}
