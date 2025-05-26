import { Body, Controller, Post } from '@nestjs/common';
import { LibreTranslateService } from './libre-translate/libre-translate.service';
import { GoogleTranslateService } from './google-translate/google-translate.service';
import { ConfigService } from '@nestjs/config';
import { TranslateDto } from './dto/translate.dto';

@Controller('translate')
export class TranslateController {
  nodeEnv: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly googleTranslateService: GoogleTranslateService,
    private readonly libreTranslateService: LibreTranslateService,
  ) {
    this.nodeEnv = this.configService.getOrThrow<string>('NODE_ENV');
  }

  @Post()
  async translate(@Body() body: TranslateDto) {
    const service =
      this.nodeEnv === 'production'
        ? this.googleTranslateService
        : this.libreTranslateService;

    const translatedText = await service.translate(
      body.text,
      body.source || 'auto',
      body.target,
    );

    return { translatedText };
  }
}
