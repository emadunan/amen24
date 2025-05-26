import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleTranslateService {
  apiKey: string;
  url: string;

  constructor(private configService: ConfigService, private readonly httpService: HttpService) {
    this.apiKey = this.configService.getOrThrow<string>("GOOGLE_TRANSLATE_API_KEY");
    this.url = this.configService.getOrThrow<string>("GOOGLE_TRANSLATE_API_URL");
  }

  async translate(text: string, source: string, target: string): Promise<string> {
    try {
      const response = await firstValueFrom(this.httpService.post(`${this.url}?key=${this.apiKey}`, {
        q: text,
        source,
        target,
        format: 'text',
      }));

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      throw new Error('Translation failed');
    }
  }
}
