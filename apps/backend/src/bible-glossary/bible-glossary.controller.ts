import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BibleGlossaryService } from './bible-glossary.service';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';
import { title } from 'process';

@Controller('bible-glossary')
export class BibleGlossaryController {
  constructor(private readonly bibleGlossaryService: BibleGlossaryService) { }

  @Post()
  async create(@Body() createBibleGlossaryDto: CreateBibleGlossaryDto) {
    return await this.bibleGlossaryService.create(createBibleGlossaryDto);
  }

  @Get()
  async findAll(@Query() query: { title: string }) {
    return await this.bibleGlossaryService.findAll(query);
  }

  @Get('check/:title')
  checkIsExist(@Param('title') title: string) {
    return this.bibleGlossaryService.checkExistByTitle(title);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bibleGlossaryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBibleGlossaryDto: UpdateBibleGlossaryDto,
  ) {
    return this.bibleGlossaryService.update(+id, updateBibleGlossaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibleGlossaryService.remove(+id);
  }
}
