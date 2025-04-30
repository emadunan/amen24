import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { VersesService } from './verses.service';
import { BookKey, Lang } from '@amen24/shared';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService, private dashboardService: DashboardService) { }

  @UseGuards(OptionalJwtAuthGuard)
  @Post('query')
  async findVerses(@Body() body: { query: string; selectedBooks: BookKey[] }, @CurrentUser('email') email: string) {
    const { query, selectedBooks } = body;
    this.dashboardService.incrementSearchCount();
    return await this.versesService.findManyByQuery(query, selectedBooks, email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('groups')
  async findVerseGroups() {
    return await this.versesService.findVerseGroups();
  }

  @Get(':bookKey/:chapterNum/:lang')
  @UseGuards(OptionalJwtAuthGuard)
  findChapter(
    @Param('bookKey') bookKey: BookKey,
    @Param('chapterNum', ParseIntPipe) chapterNum: number,
    @Param('lang') lang: Lang,
    @CurrentUser('email') email: string
  ) {
    this.dashboardService.incrementBibleAccess();
    return this.versesService.findChapter(bookKey, chapterNum, lang, email);
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
