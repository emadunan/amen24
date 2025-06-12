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

    if (!book) throw new NotFoundException();

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
    return await this.libraryChapterRepo.findOneBy({ id });
  }

  async update(id: string, dto: UpdateLibraryChapterDto) {
    const chapter = await this.libraryChapterRepo.findOneBy({ id });
    if (!chapter) throw new NotFoundException();

    Object.assign(chapter, dto);
    return await this.libraryChapterRepo.save(chapter);
  }

  async remove(id: string) {
    const chapter = await this.libraryChapterRepo.findOneBy({ id });
    if (!chapter) throw new NotFoundException();

    return await this.libraryChapterRepo.remove(chapter);
  }

  async getNextOrder(slug: string) {
    const book = await this.libraryBookService.findOneBySlug(slug);
    if (!book) throw new NotFoundException("Book not found");

    const result = await this.libraryChapterRepo
      .createQueryBuilder("chapter")
      .select("MAX(chapter.order)", "max")
      .where("chapter.bookId = :bookId", { bookId: book.id })
      .getRawOne();

    const maxOrder = result?.max ?? 0;
    return Number(maxOrder) + 1;
  }

  async changeOrder(bookSlug: string, chapterOrder: number, targetOrder: number) {
    if (chapterOrder === targetOrder) return;

    const book = await this.libraryBookService.findOneBySlug(bookSlug);
    if (!book) throw new NotFoundException("Book not found");

    const chapters = await this.libraryChapterRepo.find({
      where: { book: { id: book.id } },
      order: { order: "ASC" },
    });

    const movingChapter = chapters.find(ch => ch.order === chapterOrder);
    if (!movingChapter) throw new NotFoundException("Chapter to move not found");

    // Shift orders
    const newChapters = chapters.map(chapter => {
      if (chapter.id === movingChapter.id) {
        chapter.order = targetOrder;
      } else if (chapterOrder < targetOrder) {
        // Moving down
        if (chapter.order > chapterOrder && chapter.order <= targetOrder) {
          chapter.order -= 1;
        }
      } else {
        // Moving up
        if (chapter.order >= targetOrder && chapter.order < chapterOrder) {
          chapter.order += 1;
        }
      }
      return chapter;
    });

    // Save updated chapters
    await this.libraryChapterRepo.save(newChapters);
  }

}
