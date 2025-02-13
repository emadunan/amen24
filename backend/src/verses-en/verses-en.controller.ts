import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersesEnService } from './verses-en.service';
import { CreateVersesEnDto } from './dto/create-verse-en.dto';
import { UpdateVersesEnDto } from './dto/update-verse-en.dto';

@Controller('verses-en')
export class VersesEnController {
  constructor(private readonly versesEnService: VersesEnService) { }

  @Post()
  create(@Body() createVersesEnDto: CreateVersesEnDto) {
    return this.versesEnService.create(createVersesEnDto);
  }

  @Get()
  findAll() {
    return this.versesEnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesEnService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersesEnDto: UpdateVersesEnDto) {
    return this.versesEnService.update(+id, updateVersesEnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesEnService.remove(+id);
  }
}
