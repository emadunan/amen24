import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { VersesModule } from '../verses/verses.module';
import { ChaptersModule } from '../chapters/chapters.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark]), ProfilesModule, ChaptersModule ,VersesModule],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule { }
