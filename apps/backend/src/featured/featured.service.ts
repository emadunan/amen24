import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { UpdateFeaturedDto } from './dto/update-featured.dto';
import { VersesService } from '../verses/verses.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Featured } from './entities/featured.entity';
import { Repository } from 'typeorm';
import { buildJoinedText, ERROR_KEYS, Lang } from '@amen24/shared';
import { FeaturedText } from './entities/featured-text.entity';

@Injectable()
export class FeaturedService {
  constructor(
    @InjectRepository(Featured) private featuredRepo: Repository<Featured>,
    @InjectRepository(FeaturedText)
    private featuredTextRepo: Repository<FeaturedText>,
    private versesService: VersesService,
  ) { }

  async addToFeatured(verseIds: number[]) {
    // 1. Retrieve or create the verse group
    let verseGroup =
      await this.versesService.findVerseGroupByVerseIds(verseIds);

    if (!verseGroup) {
      verseGroup = await this.versesService.createVerseGroup(verseIds);
    }

    if (!verseGroup) {
      throw new NotImplementedException('Verse group creation failed.');
    }

    // 2. Check if already featured
    const existing = await this.featuredRepo.findOne({
      where: { verseGroup: { id: verseGroup.id } },
    });

    if (existing) {
      throw new ConflictException(ERROR_KEYS.VERSE_GROUP_FEATURED);
    }

    // 3. Create Featured entity
    const featured = await this.featuredRepo.save(
      this.featuredRepo.create({ verseGroup }),
    );

    // 4. Prepare supported languages
    const langs = [Lang.ENGLISH, Lang.ARABIC];

    // 5. Ensure verses with translations are loaded (in case verseGroup.verses are not populated)
    const populatedGroup = await this.versesService.findVerseGroupById(
      verseGroup.id,
    );

    // 6. Create FeaturedText records
    const featuredTexts = langs.map((lang) => {
      const joinedText = buildJoinedText(populatedGroup.verses, lang);

      return this.featuredTextRepo.create({
        featured,
        lang,
        text: joinedText,
      });
    });

    await this.featuredTextRepo.save(featuredTexts);

    return featured;
  }

  async removeFromFeatured(id: number) {
    const featured = await this.featuredRepo.findOne({
      where: { id },
      relations: ['verseGroup', 'verseGroup.favorites'],
    });

    if (!featured) throw new NotFoundException();

    const result = await this.featuredRepo.remove(featured);

    if (featured.verseGroup.favorites.length < 1) {
      await this.versesService.deleteVerseGroup(featured.verseGroup.id);
    }

    return result;
  }

  async getAllFeatured(lang: Lang | null) {
    if (!lang) lang = Lang.ENGLISH;

    const featured = await this.featuredRepo
      .createQueryBuilder('featured')
      .leftJoinAndSelect('featured.featuredText', 'featuredText', 'featuredText.lang = :lang', { lang })
      .leftJoinAndSelect('featured.verseGroup', 'verseGroup')
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
      .orderBy('startingVerse.id', 'ASC')
      .getMany();

    for (const f of featured) {
      f.verseGroup.verses.sort((a, b) => a.id - b.id);
    }

    return featured;
  }

  async getFeaturedText(id: number) {
    const featuredText = await this.featuredTextRepo.find({
      where: {
        featured: { id },
      },
      relations: [
        'featured',
        'featured.verseGroup',
        'featured.verseGroup.verses',
        'featured.verseGroup.startingVerse',
        'featured.verseGroup.startingVerse.chapter',
        'featured.verseGroup.startingVerse.chapter.book',
      ],
      order: {
        lang: "ASC"
      }
    });

    if (!featuredText) throw new NotFoundException();

    // Only sort first translation since we just need it to extract portion reference for Title
    featuredText[0].featured.verseGroup.verses.sort((a, b) => a.id - b.id);

    return featuredText;
  }

  async updateFeaturedText(id: number, text: string) {
    const featuredText = await this.featuredTextRepo.findOneBy({ id });

    if (!featuredText) throw new NotFoundException();
    Object.assign(featuredText, { text });

    return await this.featuredTextRepo.save(featuredText);
  }

  create(createFeaturedDto: CreateFeaturedDto) {
    return 'This action adds a new featured';
  }

  findAll() {
    return `This action returns all featured`;
  }

  findOne(id: number) {
    return `This action returns a #${id} featured`;
  }

  update(id: number, featuredDto: UpdateFeaturedDto) {
    return `This action updates a #${id} featured`;
  }

  remove(id: number) {
    return `This action removes a #${id} featured`;
  }
}
