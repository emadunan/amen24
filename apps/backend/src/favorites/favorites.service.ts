import {
  ConflictException,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfilesService } from '../profiles/profiles.service';
import { VersesService } from '../verses/verses.service';
import { ERROR_KEYS, Lang } from '@amen24/shared';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favoritesRepo: Repository<Favorite>,
    private profilesService: ProfilesService,
    private versesService: VersesService,
  ) { }

  async getFavorites(email: string, lang: Lang | null) {
    if (!lang) lang = Lang.ENGLISH;

    const favorites = await this.favoritesRepo
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.verseGroup', 'verseGroup')
      .leftJoinAndSelect('verseGroup.verses', 'verse')
      .leftJoinAndSelect(
        'verse.verseTranslations',
        'verseTranslation',
        'verseTranslation.lang = :lang',
        { lang },
      )
      .leftJoinAndSelect('verseGroup.startingVerse', 'startingVerse')
      .leftJoinAndSelect('startingVerse.chapter', 'chapter')
      .leftJoinAndSelect('chapter.book', 'book')
      .leftJoin('favorite.profile', 'profile')
      .where('profile.email = :email', { email })
      .orderBy('startingVerse.id', 'ASC') // 👈 Order by starting verse ID
      .getMany();

    // Sort verses inside each group manually
    for (const fav of favorites) {
      fav.verseGroup.verses.sort((a, b) => a.id - b.id);
    }

    return favorites;
  }

  async addFavoriteToProfile(
    email: string,
    verseIds: number[],
  ): Promise<Favorite> {
    const profile = await this.profilesService.findOne(email);
    if (!profile) throw new UnauthorizedException();

    let verseGroup =
      await this.versesService.findVerseGroupByVerseIds(verseIds);

    if (!verseGroup) {
      verseGroup = await this.versesService.createVerseGroup(verseIds);
    }

    if (!verseGroup) throw new NotImplementedException();

    const existing = await this.favoritesRepo.findOne({
      where: {
        profile: { email },
        verseGroup: { id: verseGroup.id },
      },
    });

    if (existing) {
      throw new ConflictException(ERROR_KEYS.VERSE_GROUP_FAVORITED);
    }

    const favorite = this.favoritesRepo.create({ profile, verseGroup });
    return this.favoritesRepo.save(favorite);
  }

  async removeFavorite(email: string, favoriteId: number) {
    // Step 1: Find the favorite by ID and profile email
    const favorite = await this.favoritesRepo.findOne({
      where: {
        id: favoriteId,
        profile: { email },
      },
      relations: ['verseGroup', 'verseGroup.featured'],
    });

    if (!favorite) {
      throw new UnauthorizedException(
        'Favorite not found or does not belong to this profile',
      );
    }

    // Step 2: Delete the favorite
    const result = await this.favoritesRepo.remove(favorite);

    // Step 3: Check if the verseGroup is still linked to any other favorites
    const remainingFavorites = await this.favoritesRepo.count({
      where: {
        verseGroup: { id: favorite.verseGroup.id },
      },
    });

    const isFeatured = !!favorite.verseGroup.featured;

    // If no other profile has this verseGroup, we can delete the verseGroup
    if (remainingFavorites === 0 && !isFeatured) {
      await this.versesService.deleteVerseGroup(favorite.verseGroup.id);
    }

    return result;
  }
}
