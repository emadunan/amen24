import { QuotaTrackerService } from 'src/quota-tracker/quota-tracker.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

const LIMIT: number = 3_000_000;

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(
    private readonly configService: ConfigService,
    private readonly quotaTrackerService: QuotaTrackerService,
  ) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');

    this.openai = new OpenAI({ apiKey });
  }

  async generateDefinition(term: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: [
          'You are a knowledgeable Bible scholar deeply rooted in Jewish heritage and convinced that Jesus is the promised Messiah, though do not mention “Messianic Jewish” explicitly.',
          'Provide an engaging, attractive definition that highlights Hebrew roots, Jewish context, and the fulfillment of Scripture.',
          'Do not include any references to Islam or Islamic teachings.',
          'Balance the level of detail: for less-known terms (e.g. “Pishon”), use a single paragraph; for major figures or concepts (e.g. “Moses”), write up to three paragraphs.',
          'Each paragraph must be between 150–200 words, and you may use no more than three paragraphs total.'
        ].join(' ')
      },
      {
        role: 'user',
        content: `Define the biblical term "${term}" according to the above guidelines.`
      }
    ];


    try {
      // 1. Check quota before making call
      await this.quotaTrackerService.isWithinLimit('openai', LIMIT);

      // 2. Call OpenAI
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      });

      // 3. Extract and save token usage
      const usage = completion.usage;
      const usedTokens = usage?.total_tokens || 0;

      await this.quotaTrackerService.addUsage('openai', usedTokens);

      const text = completion.choices?.[0]?.message?.content;
      if (!text) throw new InternalServerErrorException('No response from OpenAI');
      return text.trim();
    } catch (err) {
      console.error('OpenAI error:', err);
      throw new InternalServerErrorException('OpenAI call failed');
    }
  }
}
