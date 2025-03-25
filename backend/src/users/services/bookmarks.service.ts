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

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark) private bookmarksRepo: Repository<Bookmark>,
  ) {}

  async getAll(profileEmail: string) {
    return await this.bookmarksRepo.findBy({ profileEmail });
  }

  async getOne(profileEmail: string) {
    const lastRead = ['Last Read', 'آخر قراءة'];
    return await this.bookmarksRepo.findOneBy({
      profileEmail,
      title: In(lastRead),
    });
  }

  async create(bookmarkDto: CreateBookmarkDto) {
    const { profileEmail } = bookmarkDto;

    const bookmarkCount = await this.bookmarksRepo.count({
      where: { profileEmail },
    });

    if (bookmarkCount >= 1)
      throw new BadRequestException('bookmarkExceedLimit');

    const bookmark = this.bookmarksRepo.create(bookmarkDto);

    return await this.bookmarksRepo.save(bookmark);
  }

  async update(id: number, bookmarkDto: UpdateBookmarkDto) {
    const bookmark = await this.bookmarksRepo.findOneBy({ id });

    if (!bookmark) throw new NotFoundException('bookmarkNotFound');

    Object.assign(bookmark, bookmarkDto);

    return await this.bookmarksRepo.save(bookmark);
  }

  async delete(id: number, profileEmail: string) {
    const bookmark = await this.bookmarksRepo.findOneBy({ id, profileEmail });

    if (!bookmark) throw new NotFoundException('bookmarkNotFound');

    await this.bookmarksRepo.delete(id);
  }
}
