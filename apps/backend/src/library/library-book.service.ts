import { Injectable } from '@nestjs/common';
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
  
  findAll() { }
  findOne(id: string) { }
  update(id: string, dto: UpdateLibraryBookDto) { }
  remove(id: string) { }
}
