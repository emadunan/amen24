import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BibleGlossaryService } from './bible-glossary.service';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';

@Controller('bible-glossary')
export class BibleGlossaryController {
  constructor(private readonly bibleGlossaryService: BibleGlossaryService) { }

  @Post()
  async create(@Body() createBibleGlossaryDto: CreateBibleGlossaryDto) {
    return await this.bibleGlossaryService.create(createBibleGlossaryDto);
  }

  @Get()
  async findAll(@Query() query: { slug: string }) {
    return await this.bibleGlossaryService.findAll(query);
  }

  @Get('check/:title')
  checkIsExist(@Param('title') title: string) {
    return this.bibleGlossaryService.checkExistByTitle(title);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.bibleGlossaryService.findOne(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateBibleGlossaryDto: UpdateBibleGlossaryDto,
  ) {
    return this.bibleGlossaryService.update(slug, updateBibleGlossaryDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.bibleGlossaryService.remove(slug);
  }
}
