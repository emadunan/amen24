import { Module } from '@nestjs/common';
import { VersesService } from './verses.service';
import { VersesController } from './verses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { ChaptersModule } from '../chapters/chapters.module';
import { VerseTranslation } from './entities/verse-translation.entity';
import { VerseGroup } from './entities/verse-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verse, VerseGroup, VerseTranslation]),
    ChaptersModule,
  ],
  controllers: [VersesController],
  providers: [VersesService],
  exports: [VersesService],
})
export class VersesModule {}
