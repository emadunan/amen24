import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { VersesModule } from '../verses/verses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), ProfilesModule, VersesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
