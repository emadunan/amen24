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
        const result = await this.booksRepo.insert({ bookKey: key as BookKey });
        const bookId = result.identifiers[0].id;

        const chapterNums = Array.from(
          { length: BookMap[key].len },
          (_v, k) => k + 1,
        );

        for (const chapterNum of chapterNums) {
          await this.chaptersService.insert({
            num: chapterNum,
            book: { id: bookId },
          });
        }
      }
    }
  }
}
