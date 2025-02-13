import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VersesNativeService } from './verses-native.service';
import { CreateVersesNativeDto } from './dto/create-verse-native.dto';
import { UpdateVersesNativeDto } from './dto/update-verse-native.dto';

@Controller('verses-native')
export class VersesNativeController {
  constructor(private readonly versesNativeService: VersesNativeService) { }

  @Post()
  create(@Body() createVersesNativeDto: CreateVersesNativeDto) {
    return this.versesNativeService.create(createVersesNativeDto);
  }

  @Get()
  findAll() {
    return this.versesNativeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.versesNativeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVersesNativeDto: UpdateVersesNativeDto) {
    return this.versesNativeService.update(+id, updateVersesNativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.versesNativeService.remove(+id);
  }
}
