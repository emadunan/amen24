import { Injectable } from '@nestjs/common';
import { UpdateLibraryChapterDto } from './dto/update-library-chapter.dto';
import { CreateLibraryChapterDto } from './dto/create-library-chapter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LibraryChapter } from './entities/library-chapter.entity';
import { Repository } from 'typeorm';
import { normalizeText } from '@amen24/shared';

@Injectable()
export class LibraryChapterService {
  constructor(@InjectRepository(LibraryChapter) private libraryChapterRepo: Repository<LibraryChapter>) {}

  async create(dto: CreateLibraryChapterDto) {
    const normalizedContent = normalizeText(dto.content, dto.lang);
    dto.normalizedContent = normalizedContent;

    const chapter = this.libraryChapterRepo.create(dto);
    return await this.libraryChapterRepo.save(chapter);
  }

  findAll() { }
  findOne(id: string) { }
  update(id: string, dto: UpdateLibraryChapterDto) { }
  remove(id: string) { }
}
