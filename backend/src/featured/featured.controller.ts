import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { UpdateFeaturedDto } from './dto/update-featured.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { User as UserParam } from '../auth/decorators/user.decorator';

@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) { }

  @Post()
  create(@Body() body: { verseIds: number[] }) {
    return this.featuredService.addToFeatured(body.verseIds);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@UserParam() user: User) {
    return await this.featuredService.getAllFeatured(user.profile.uiLang);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuredService.getFeaturedText(+id);
  }

  // TO DO
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeaturedDto: UpdateFeaturedDto,
  ) {
    return this.featuredService.update(+id, updateFeaturedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuredService.removeFromFeatured(+id);
  }
}
