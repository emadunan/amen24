import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow<string>('OPENAI_API_KEY');

    this.openai = new OpenAI({ apiKey });
  }

  async generateDefinition(term: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: 'You are a helpful Bible scholar. Provide a concise definition of the given term.',
      },
      {
        role: 'user',
        content: `Define the biblical term "${term}" in a clear, 150–200 word paragraph.`,
      },
    ];

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      });
      const text = completion.choices?.[0]?.message?.content;
      if (!text) throw new InternalServerErrorException('No response from OpenAI');
      return text.trim();
    } catch (err) {
      console.error('OpenAI error:', err);
      throw new InternalServerErrorException('OpenAI call failed');
    }
  }
}
