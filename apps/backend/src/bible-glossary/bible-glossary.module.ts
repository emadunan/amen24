import { Module } from '@nestjs/common';
import { BibleGlossaryService } from './bible-glossary.service';
import { BibleGlossaryController } from './bible-glossary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleGlossary } from './entities/bible-glossary.entity';
import { BibleGlossaryTranslation } from './entities/bible-glossary-translation.entity';
import { VersesModule } from 'src/verses/verses.module';

@Module({
  imports: [TypeOrmModule.forFeature([BibleGlossary, BibleGlossaryTranslation]), VersesModule],
  controllers: [BibleGlossaryController],
  providers: [BibleGlossaryService],
})
export class BibleGlossaryModule { }
