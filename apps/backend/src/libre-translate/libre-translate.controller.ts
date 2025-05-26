import { Body, Controller, Post } from '@nestjs/common';
import { LibreTranslateService } from './libre-translate.service';

@Controller('translate')
export class LibreTranslateController {
  constructor(private readonly libreTranslateService: LibreTranslateService) {}

  @Post()
  async translate(@Body() body: { text: string; source?: string; target: string }) {
    const translatedText = await this.libreTranslateService.translate(
      body.text,
      body.source || 'auto',
      body.target
    );

    return { translatedText };
  }
}
