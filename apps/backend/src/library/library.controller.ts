import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryBookService } from './library-book.service';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';
import { LibraryChapterService } from './library-chapter.service';
import { CreateLibraryChapterDto } from './dto/create-library-chapter.dto';

@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryBookService: LibraryBookService,
    private readonly libraryChapterService: LibraryChapterService,
  ) { }

  @Post()
  async create(@Body() dto: CreateLibraryBookDto) {
    return await this.libraryBookService.create(dto);
  }

  @Post('chapter')
  async createChapter(@Body() dto: CreateLibraryChapterDto) {
    return await this.libraryChapterService.create(dto);
  }

  @Get()
  findAll() {
    return this.libraryBookService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.LibraryBookService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateLibraryBookDto) {
  //   return this.LibraryBookService.update(+id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.LibraryBookService.remove(+id);
  // }
}
