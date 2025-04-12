import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { UpdateFeaturedDto } from './dto/update-featured.dto';

@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) {}

  @Post()
  create(@Body() createFeaturedDto: CreateFeaturedDto) {
    return this.featuredService.create(createFeaturedDto);
  }

  @Get()
  findAll() {
    return this.featuredService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuredService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeaturedDto: UpdateFeaturedDto,
  ) {
    return this.featuredService.update(+id, updateFeaturedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuredService.remove(+id);
  }
}
