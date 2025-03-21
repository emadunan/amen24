import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BookKey, BookMap } from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepo: Repository<Book>,
    private chaptersService: ChaptersService,
  ) {}

  async findAll() {
    return await this.booksRepo.find();
  }

  async seed() {
    for (const key in BookMap) {
      if (Object.prototype.hasOwnProperty.call(BookMap, key)) {
        await this.booksRepo.insert({ bookKey: key as BookKey });

        const chapterNos = Array.from(
          { length: BookMap[key].len },
          (_v, k) => k + 1,
        );

        for (const chapterNo of chapterNos) {
          await this.chaptersService.insert({
            bookKey: key as BookKey,
            chapterNo,
          });
        }
      }
    }
  }
}
