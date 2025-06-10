import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLibraryChapterDto } from './dto/update-library-chapter.dto';
import { CreateLibraryChapterDto } from './dto/create-library-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryChapter } from './entities/library-chapter.entity';
import { Repository } from 'typeorm';
import { normalizeText } from '@amen24/shared';
import { LibraryBookService } from './library-book.service';

@Injectable()
export class LibraryChapterService {
  constructor(
    @InjectRepository(LibraryChapter) private libraryChapterRepo: Repository<LibraryChapter>,
    private readonly libraryBookService: LibraryBookService,
  ) { }

  async create(dto: CreateLibraryChapterDto) {
    const book = await this.libraryBookService.findOneBySlug(dto.slug);

    if(!book) throw new NotFoundException();

    dto.book = book;
    const normalizedContent = normalizeText(dto.content, book.lang);
    dto.normalizedContent = normalizedContent;

    const chapter = this.libraryChapterRepo.create(dto);
    return await this.libraryChapterRepo.save(chapter);
  }

  async findAll() {
    return await this.libraryChapterRepo.find();
  }

  async findOne(id: string) {
    return await this.libraryChapterRepo.findBy({ id });
  }

  async update(id: string, dto: UpdateLibraryChapterDto) {
    const chapter = await this.libraryChapterRepo.findBy({ id });
    if (!chapter) throw new NotFoundException();

    Object.assign(chapter, dto);
    return await this.libraryChapterRepo.save(chapter);
  }

  async remove(id: string) {
    const chapter = await this.libraryChapterRepo.findBy({ id });
    if (!chapter) throw new NotFoundException();

    return await this.libraryChapterRepo.remove(chapter)
  }
}
