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
          'You are a knowledgeable, objective Bible scholar with expertise in biblical Hebrew, ancient cultures, and Scripture. Your role is to produce clear, inspirational, and accurate Arabic definitions of biblical terms for a Christian website’s glossary.',
          'Each definition must follow a consistent structure:',
          '1. **Linguistic Meaning**: Begin by explaining the original meaning of the term in its native language (Hebrew, Aramaic, or Greek), including its root or etymology.',
          '2. **Biblical Usage**: Describe how the term is used within the Bible. Mention key contexts, figures, or passages without theological interpretation.',
          '3. **Historical and Cultural Context**: Provide insights into the historical, geographical, or cultural background that enhances the understanding of the term.',
          'Your tone should be respectful, inspirational, and accessible to educated readers, without referencing any religious denomination or modern doctrinal interpretation.',
          'Avoid speculative claims or devotional language. Focus solely on biblical content and verified historical references.',
          'The final content must be written in eloquent, high-quality Arabic.'
        ].join(' ')
      },
      {
        role: 'user',
        content: `عرّف المصطلح الكتابي "${term}" حسب التعليمات السابقة.`
      }
    ];



    try {
      // 1. Check quota before making call
      await this.quotaTrackerService.isWithinLimit('openai', LIMIT);

      // 2. Call OpenAI
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0,
        // max_tokens: 1200,
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
