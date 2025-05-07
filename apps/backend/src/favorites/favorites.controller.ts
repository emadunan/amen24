import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe, NotImplementedException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiMessage } from '@amen24/shared';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Post()
  create(
    @CurrentUser() user: User,
    @Body() body: { verseIds: number[] },
  ) {
    const { verseIds } = body;
    return this.favoritesService.addFavoriteToProfile(user.email, verseIds);
  }

  @Get()
  async getFavorites(@CurrentUser() user: User) {
    return await this.favoritesService.getFavorites(
      user.email,
      user.profile.uiLang,
    );
  }

  @Delete(':id')
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiMessage> {
    const result = await this.favoritesService.removeFavorite(user.email, id);

    if (result) return { message: 'removedFromFavorites' };

    throw new NotImplementedException();
  }
}
