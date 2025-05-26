import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LibreTranslateService {
  libreTranslateUrl: string;
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.libreTranslateUrl = this.configService.getOrThrow<string>(
      'LIBRE_TRANSLATE_URL',
    );
  }

  async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post(
        `${this.libreTranslateUrl}/translate`,
        {
          q: text,
          source,
          target,
          format: 'text',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return response.data?.translatedText;
  }
}
