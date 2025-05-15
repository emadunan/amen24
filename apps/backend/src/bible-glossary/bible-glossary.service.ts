import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Verse } from 'src/verses/entities/verse.entity';
import { BibleGlossary } from './entities/bible-glossary.entity';
import { BibleGlossaryTranslation } from './entities/bible-glossary-translation.entity';
import { ERROR_KEYS, Lang } from '@amen24/shared';
import { VersesService } from 'src/verses/verses.service';

@Injectable()
export class BibleGlossaryService {
  constructor(
    @InjectRepository(BibleGlossary)
    private glossaryRepo: Repository<BibleGlossary>,

    @InjectRepository(BibleGlossaryTranslation)
    private glossaryTranslationRepo: Repository<BibleGlossaryTranslation>,

    private versesService: VersesService,
  ) { }

  async create(dto: CreateBibleGlossaryDto) {
    const translations = Object.entries(dto.translations).map(([lang, value]) =>
      this.glossaryTranslationRepo.create({
        lang: lang as Lang,
        title: value.term,
        description: value.definition,
      }),
    );

    const glossary = this.glossaryRepo.create({
      slug: dto.slug,
      translations,
    });

    if (dto.verseIds?.length) {
      const verses = await this.versesService.findVersesByIds(dto.verseIds);
      glossary.verses = verses;
    }

    return await this.glossaryRepo.save(glossary);
  }

  async findAll() {
    return await this.glossaryRepo.find({ relations: ['verses', 'translations'] });
  }

  async findOne(id: number) {
    const glossary = await this.glossaryRepo.findOne({
      where: { id },
      relations: ['verses'],
    });

    if (!glossary) throw new NotFoundException(ERROR_KEYS.GLOSSARY_NOT_FOUND);

    return glossary;
  }

  async update(id: number, dto: UpdateBibleGlossaryDto) {
    const glossary = await this.findOne(id);

    Object.assign(glossary, dto);

    if (dto.verseIds) {
      const verses = await this.versesService.findVersesByIds(dto.verseIds);
      glossary.verses = verses;
    }

    return this.glossaryRepo.save(glossary);
  }

  async remove(id: number) {
    const glossary = await this.findOne(id);
    await this.glossaryRepo.remove(glossary);
  }
}
