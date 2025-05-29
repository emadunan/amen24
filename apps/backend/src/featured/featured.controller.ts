import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FeaturedService } from './featured.service';
import { UpdateFeaturedDto } from './dto/update-featured.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { FeaturedPosition, Lang, Permission } from '@amen24/shared';

@Controller('featured')
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) { }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_FEATURED)
  create(@Body() body: { verseIds: number[] }) {
    return this.featuredService.addToFeatured(body.verseIds);
  }

  @Get()
  async findAll(
    @Query('position') position?: FeaturedPosition,
    @Query('lang') lang?: Lang
  ) {
    console.log("LANG: ", lang);
    
    return await this.featuredService.getAllFeatured(lang, position);
  }


  @Patch('text')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_FEATURED)
  async updateFeatuedText(@Body() body: { id: number; text: string }) {
    const { id, text } = body;
    return await this.featuredService.updateFeaturedText(id, text);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_FEATURED)
  findOne(@Param('id') id: string) {
    return this.featuredService.getFeaturedText(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_FEATURED)
  update(
    @Param('id') id: string,
    @Body() updateFeaturedDto: UpdateFeaturedDto,
  ) {
    return this.featuredService.update(+id, updateFeaturedDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.MANAGE_FEATURED)
  remove(@Param('id') id: string) {
    return this.featuredService.removeFromFeatured(+id);
  }
}
