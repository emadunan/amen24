import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersesArService } from './verses-ar.service';
import { CreateVersesArDto } from './dto/create-verse-ar.dto';
import { UpdateVersesArDto } from './dto/update-verse-ar.dto';

@Controller('verses-ar')
export class VersesArController {
  constructor(private readonly versesArService: VersesArService) { }

  @Post()
  create(@Body() createVersesArDto: CreateVersesArDto) {
    return this.versesArService.create(createVersesArDto);
  }

  @Get()
  findAll() {
    return this.versesArService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesArService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersesArDto: UpdateVersesArDto) {
    return this.versesArService.update(+id, updateVersesArDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesArService.remove(+id);
  }
}
