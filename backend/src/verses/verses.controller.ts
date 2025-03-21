import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VersesService } from './verses.service';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { BookKey, Lang } from '@amen24/shared';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) {}

  @Post('query')
  async findVerses(@Body() body: { query: string; selectedBooks: BookKey[] }) {
    const { query, selectedBooks } = body;

    return [];
  }

  @Get(':bookKey/:chapterNo/:lang')
  findChapter(
    @Param('bookKey') bookKey: BookKey,
    @Param('chapterNo', ParseIntPipe) chapterNo: number,
    @Param('lang') lang: Lang,
  ) {
    return this.versesService.findChapter(bookKey, chapterNo, lang);
  }

  @Get(':bookKey/:chapterNo/:verseNo/:lang')
  findOne(
    @Param('bookKey') bookKey: BookKey,
    @Param('chapterNo', ParseIntPipe) chapterNo: number,
    @Param('verseNo', ParseIntPipe) verseNo: number,
    @Param('lang') lang: Lang,
  ) {
    return this.versesService.findOne(bookKey, chapterNo, verseNo, lang);
  }
}
