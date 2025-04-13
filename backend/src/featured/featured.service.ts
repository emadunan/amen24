import {
  ConflictException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { CreateFeaturedDto } from './dto/create-featured.dto';
import { UpdateFeaturedDto } from './dto/update-featured.dto';
import { VersesService } from 'src/verses/verses.service';
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
  ) {}

  async addToFeatured(verseIds: number[]) {
    // 1. Retrieve or create the verse group
    let verseGroup = await this.versesService.findVerseGroupByVerseIds(verseIds);
  
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
    const populatedGroup = await this.versesService.findVerseGroupById(verseGroup.id);
  
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
  

  create(createFeaturedDto: CreateFeaturedDto) {
    return 'This action adds a new featured';
  }

  findAll() {
    return `This action returns all featured`;
  }

  findOne(id: number) {
    return `This action returns a #${id} featured`;
  }

  update(id: number, updateFeaturedDto: UpdateFeaturedDto) {
    return `This action updates a #${id} featured`;
  }

  remove(id: number) {
    return `This action removes a #${id} featured`;
  }
}
