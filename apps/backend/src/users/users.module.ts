import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { VersesModule } from '../verses/verses.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { ProgressModule } from 'src/progress/progress.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => ProfilesModule),
    VersesModule,
    ProgressModule,
    FavoritesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
