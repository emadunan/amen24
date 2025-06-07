import { Module } from '@nestjs/common';
import { LibraryBookService } from './library-book.service';
import { LibraryController } from './library.controller';
import { LibraryChapterService } from './library-chapter.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryBook } from './entities/library-book.entity';
import { LibraryChapter } from './entities/library-chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibraryBook, LibraryChapter])],
  controllers: [LibraryController],
  providers: [LibraryBookService, LibraryChapterService],
})
export class LibraryModule { }
