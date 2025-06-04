import { Module } from '@nestjs/common';
import { BibleGlossaryService } from './bible-glossary.service';
import { BibleGlossaryController } from './bible-glossary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleGlossary } from './entities/bible-glossary.entity';
import { BibleGlossaryTranslation } from './entities/bible-glossary-translation.entity';
import { VersesModule } from '../verses/verses.module';
import { OpenAiModule } from 'src/openai/openai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BibleGlossary, BibleGlossaryTranslation]),
    VersesModule,
    OpenAiModule,
  ],
  controllers: [BibleGlossaryController],
  providers: [BibleGlossaryService],
})
export class BibleGlossaryModule {}
