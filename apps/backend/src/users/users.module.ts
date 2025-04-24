import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { ProfilesService } from './services/profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { AuthModule } from '../auth/auth.module';
import { Bookmark } from './entities/bookmark.entity';
import { BookmarksService } from './services/bookmarks.service';
import { FavoritesService } from './services/favorites.service';
import { Favorite } from './entities/favorite.entity';
import { VersesModule } from '../verses/verses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Bookmark, Favorite]),
    forwardRef(() => AuthModule),
    VersesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ProfilesService,
    BookmarksService,
    FavoritesService,
  ],
  exports: [UsersService, ProfilesService],
})
export class UsersModule {}
