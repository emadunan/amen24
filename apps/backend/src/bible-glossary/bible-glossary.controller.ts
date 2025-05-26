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
import { UpdateBibleGlossaryTranslationDto } from './dto/update-bible-glossary-translation.dto';

@Controller('bible-glossary')
export class BibleGlossaryController {
  constructor(private readonly bibleGlossaryService: BibleGlossaryService) {}

  @Post()
  async create(@Body() createBibleGlossaryDto: CreateBibleGlossaryDto) {
    return await this.bibleGlossaryService.create(createBibleGlossaryDto);
  }

  @Get()
  async findAll(@Query() query: { slug: string }) {
    return await this.bibleGlossaryService.findAll(query);
  }

  @Get('check/:term')
  checkIsExist(@Param('term') term: string) {
    return this.bibleGlossaryService.checkExistByTerm(term);
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

  @Patch('translation/:id')
  updateTranslation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBibleGlossaryTranslationDto,
  ) {
    return this.bibleGlossaryService.updateTranslation(id, dto);
  }
}
