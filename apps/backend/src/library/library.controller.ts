import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryService } from './library.service';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) { }

  @Post()
  create(@Body() createLibraryDto: CreateLibraryBookDto) {
    return this.libraryService.create(createLibraryDto);
  }

  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryDto: UpdateLibraryBookDto) {
    return this.libraryService.update(+id, updateLibraryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryService.remove(+id);
  }
}
