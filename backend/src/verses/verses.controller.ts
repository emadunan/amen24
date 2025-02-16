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
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { BibleBook, Language } from '@amen24/shared';

@Controller('verses')
export class VersesController {
  constructor(private readonly versesService: VersesService) {}

  @Post()
  create(@Body() createVerseDto: CreateVerseDto) {
    return this.versesService.create(createVerseDto);
  }

  @Get()
  findAll() {
    return this.versesService.findAll();
  }

  @Get(':title/:chapterNum/:lang')
  findChapter(
    @Param('title') title: BibleBook,
    @Param('chapterNum', ParseIntPipe) chapterNum: number,
    @Param('lang') lang: Language,
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
