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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '@amen24/shared';

@Controller('featured')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@RequirePermissions(Permission.MANAGE_FEATURED)
export class FeaturedController {
  constructor(private readonly featuredService: FeaturedService) {}

  @Post()
  create(@Body() body: { verseIds: number[] }) {
    return this.featuredService.addToFeatured(body.verseIds);
  }

  @Get()
  async findAll(@CurrentUser() user: User) {
    return await this.featuredService.getAllFeatured(user.profile.uiLang);
  }

  @Patch('text')
  async updateFeatuedText(@Body() body: { id: number; text: string }) {
    const { id, text } = body;
    return await this.featuredService.updateFeaturedText(id, text);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuredService.getFeaturedText(+id);
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
    return this.featuredService.removeFromFeatured(+id);
  }
}
