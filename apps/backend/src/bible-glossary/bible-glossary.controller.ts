import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BibleGlossaryService } from './bible-glossary.service';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';

@Controller('bible-glossary')
export class BibleGlossaryController {
  constructor(private readonly bibleGlossaryService: BibleGlossaryService) {}

  @Post()
  create(@Body() createBibleGlossaryDto: CreateBibleGlossaryDto) {
    return this.bibleGlossaryService.create(createBibleGlossaryDto);
  }

  @Get()
  findAll() {
    return this.bibleGlossaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bibleGlossaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBibleGlossaryDto: UpdateBibleGlossaryDto) {
    return this.bibleGlossaryService.update(+id, updateBibleGlossaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bibleGlossaryService.remove(+id);
  }
}
