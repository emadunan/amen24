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
  constructor(private readonly versesService: VersesService) { }

  @Post("query")
  async findVerses(@Body() body: { query: string, selectedBooks: BookKey[] }) {
    const { query, selectedBooks } = body;

    return await this.versesService.findVerses(query, selectedBooks);
  }

  @Get(':title/:chapterNum/:lang')
  findChapter(
    @Param('title') title: BookKey,
    @Param('chapterNum', ParseIntPipe) chapterNum: number,
    @Param('lang') lang: Lang,
  ) {
    return this.versesService.findChapter(title, chapterNum, lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerseDto: UpdateVerseDto) {
    return this.versesService.update(+id, updateVerseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesService.remove(+id);
  }
}
