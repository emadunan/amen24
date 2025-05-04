import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { VersesService } from 'src/verses/verses.service';
import { ERROR_KEYS } from '@amen24/shared';
import { ChaptersService } from 'src/chapters/chapters.service';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarksRepo: Repository<Bookmark>,

    private readonly profilesService: ProfilesService,
    private readonly chaptersService: ChaptersService,
    private readonly versesService: VersesService,
  ) {}

  async createBookmark_DEV_ONLY(profileEmail: string, chapterId: number, verseIds: number[]): Promise<Bookmark> {
    const profile = await this.profilesService.findOne(profileEmail);
    if (!profile) throw new NotFoundException(ERROR_KEYS.PROFILE_NOT_FOUND);

    const chapter = await this.chaptersService.findOneById(chapterId);
    if (!chapter) throw new NotFoundException('Chapter not found');

    const existing = await this.bookmarksRepo.findOne({
      where: { profile: { email: profileEmail }, chapter: { id: chapterId } },
    });
    if (existing) {
      throw new ConflictException('Bookmark already exists for this chapter');
    }

    const verses = await this.versesService.findVersesByIds(verseIds);
    if (!verses.length) throw new NotFoundException('No valid verses found');

    const bookmark = this.bookmarksRepo.create({
      profile,
      chapter,
      verses,
    });

    return this.bookmarksRepo.save(bookmark);
  }
}
