import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from '../entities/bookmark.entity';
import { In, Repository } from 'typeorm';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import { UpdateBookmarkDto } from '../dto/update-bookmark.dto';
import { ERROR_KEYS } from '@amen24/shared';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark) private bookmarksRepo: Repository<Bookmark>,
  ) {}

  async getAll(profileEmail: string) {
    return await this.bookmarksRepo.findBy({
      profile: { email: profileEmail },
    });
  }

  async getOne(profileEmail: string) {
    const lastRead = ['Last Read', 'آخر قراءة'];

    const bookmark = await this.bookmarksRepo.findOne({
      where: {
        profile: {
          email: profileEmail,
        },
        title: In(lastRead),
      },
      relations: ['verse', 'verse.chapter', 'verse.chapter.book'],
    });

    return bookmark;
  }

  async create(bookmarkDto: CreateBookmarkDto) {
    const { title, profileEmail, verseId } = bookmarkDto;

    const bookmarkCount = await this.bookmarksRepo.count({
      where: {
        profile: {
          email: profileEmail,
        },
      },
    });

    if (bookmarkCount >= 1)
      throw new BadRequestException(ERROR_KEYS.BOOKMARK_EXCEED_LIMIT);

    const bookmark = this.bookmarksRepo.create({
      title,
      verse: { id: verseId },
      profile: { email: profileEmail },
    });

    return await this.bookmarksRepo.save(bookmark);
  }

  async update(id: number, bookmarkDto: UpdateBookmarkDto) {
    const bookmark = await this.bookmarksRepo.findOneBy({ id });

    if (!bookmark) throw new NotFoundException(ERROR_KEYS.BOOKMARK_NOT_FOUND);

    Object.assign(bookmark, { verse: { id: bookmarkDto.verseId } });

    await this.bookmarksRepo.save(bookmark);

    return await this.bookmarksRepo.findOne({
      where: { id },
      relations: ['verse', 'verse.chapter', 'verse.chapter.book'],
    });
  }

  async delete(id: number, profileEmail: string) {
    const bookmark = await this.bookmarksRepo.findOneBy({
      id,
      profile: { email: profileEmail },
    });

    if (!bookmark) throw new NotFoundException(ERROR_KEYS.BOOKMARK_NOT_FOUND);

    await this.bookmarksRepo.delete(id);
  }
}
