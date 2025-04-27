import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { VersesService } from './verses.service';
import { BookKey, Lang } from '@amen24/shared';
import { DashboardService } from 'src/dashboard/dashboard.service';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService, private dashboardService: DashboardService) { }

  @Post('query')
  async findVerses(@Body() body: { query: string; selectedBooks: BookKey[] }) {
    const { query, selectedBooks } = body;
    this.dashboardService.incrementSearchCount();
    return await this.versesService.findManyByQuery(query, selectedBooks);
  }

  @Get(':bookKey/:chapterNum/:lang')
  findChapter(
    @Param('bookKey') bookKey: BookKey,
    @Param('chapterNum', ParseIntPipe) chapterNum: number,
    @Param('lang') lang: Lang,
  ) {
    this.dashboardService.incrementBibleAccess();
    return this.versesService.findChapter(bookKey, chapterNum, lang);
  }

  @Get(':bookKey/:chapterNum/:verseNum/:lang')
  findOne(
    @Param('bookKey') bookKey: BookKey,
    @Param('chapterNum', ParseIntPipe) chapterNum: number,
    @Param('verseNum', ParseIntPipe) verseNum: number,
    @Param('lang') lang: Lang,
  ) {
    return this.versesService.findOne(bookKey, chapterNum, verseNum, lang);
  }
}
