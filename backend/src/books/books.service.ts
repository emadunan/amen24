import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { BibleBook, BookMeta } from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepo: Repository<Book>, private chaptersService: ChaptersService) { }

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async seed() {
    let bookId = 0;

    for (const key in BookMeta) {
      if (Object.prototype.hasOwnProperty.call(BookMeta, key)) {
        bookId++;

        await this.booksRepo.insert({ title: key as BibleBook });

        const chapterNums = Array.from({ length: BookMeta[key].len }, (_v, k) => k + 1);

        for (const chapterNum of chapterNums) {
          await this.chaptersService.insert({
            num: chapterNum,
            book: { id: bookId }
          })
        }
      }
    }
  }
}
