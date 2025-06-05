import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { QuotaTrackerService } from 'src/quota-tracker/quota-tracker.service';

@Injectable()
export class GoogleTranslateService {
  private readonly apiKey: string;
  private readonly url: string;
  private readonly MONTHLY_LIMIT: number = 500_000;
  private readonly QUOTA_KEY = 'google-translate';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly quotaTrackerService: QuotaTrackerService,
  ) {
    this.url = this.configService.getOrThrow<string>('GOOGLE_TRANSLATE_API_URL');
    this.apiKey = this.configService.getOrThrow<string>('GOOGLE_TRANSLATE_API_KEY');
  }

  async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string> {
    const charCount = text.length;

    // 1. Check if usage is within limit
    const allowed = await this.quotaTrackerService.isWithinLimit(this.QUOTA_KEY, this.MONTHLY_LIMIT);
    if (!allowed) {
      throw new Error('Google Translate quota exceeded');
    }

    // 2. Make the translation API call
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.url}?key=${this.apiKey}`, {
          q: text,
          source,
          target,
          format: 'text',
        }),
      );

      const translated = response.data.data.translations[0].translatedText;

      // 3. Record usage
      await this.quotaTrackerService.addUsage(this.QUOTA_KEY, charCount);

      return translated;
    } catch (error) {
      console.error('Translation error:', error.response?.data || error.message);
      throw new Error('Translation failed');
    }
  }
}
