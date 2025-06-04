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
