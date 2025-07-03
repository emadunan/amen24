import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibraryBookDto } from './dto/create-library-book.dto';
import { UpdateLibraryBookDto } from './dto/update-library-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryBook } from './entities/library-book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibraryBookService {
  constructor(@InjectRepository(LibraryBook) private libraryBookRepo: Repository<LibraryBook>) { }

  async create(dto: CreateLibraryBookDto) {
    const book = this.libraryBookRepo.create(dto);
    return this.libraryBookRepo.save(book);
  }

  async checkByTitle(title: string) {
    return await this.libraryBookRepo.existsBy({ title });
  }

  async findAll() {
    const books = await this.libraryBookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.chapters', 'chapter')
      .orderBy('chapter.order', 'ASC')
      .getMany();

    return books.map(book => ({
      ...book,
      firstChapterId: book.chapters?.[0]?.id ?? null,
      chapters: undefined,
    }));
  }

  async findOne(id: string) {
    return await this.libraryBookRepo.findOneBy({ id });
  }

  async findOneBySlug(slug: string) {
    return await this.libraryBookRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.chapters', 'chapter')
      .where('book.slug = :slug', { slug })
      .orderBy('chapter.order', 'ASC')
      .getOne();
  }

  async update(id: string, dto: UpdateLibraryBookDto) {
    const book = await this.libraryBookRepo.findOneBy({ id });
    if (!book) throw new NotFoundException();

    Object.assign(book, dto);
    return await this.libraryBookRepo.save(book);
  }

  async remove(id: string) {
    const book = await this.libraryBookRepo.findOneBy({ id });
    if (!book) throw new NotFoundException();

    return await this.libraryBookRepo.remove(book);
  }
}
