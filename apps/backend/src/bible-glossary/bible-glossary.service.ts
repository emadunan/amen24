import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Or, Repository } from 'typeorm';
import { BibleGlossary } from './entities/bible-glossary.entity';
import { BibleGlossaryTranslation } from './entities/bible-glossary-translation.entity';
import { ERROR_KEYS, Lang, MESSAGE_KEYS } from '@amen24/shared';
import { VersesService } from '../verses/verses.service';

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
    const termTitles = Object.values(dto.translations).map((t) => t.term);
    const targetVerseId = dto.verseIds?.[0];

    const existing = await this.glossaryTranslationRepo.findOne({
      where: { title: In(termTitles) },
      relations: ['glossary', 'glossary.verses'],
    });

    // CASE 1: term exists and already connected to this verse → throw error
    if (
      existing &&
      existing.glossary.verses.some((v) => v.id === targetVerseId)
    ) {
      throw new ConflictException({
        message: ERROR_KEYS.GLOSSARY_TERM_EXIST,
        meta: {
          term: existing.title,
          lang: existing.lang,
        },
      });
    }

    // CASE 2: term exists but NOT connected to this verse → just connect
    if (existing && existing.glossary) {
      if (targetVerseId) {
        const verse = await this.versesService.findOneById(targetVerseId);
        if (!verse) throw new NotFoundException();
        existing.glossary.verses.push(verse);
        await this.glossaryRepo.save(existing.glossary);

        return { message: MESSAGE_KEYS.CONNECTED_WITH_GLOSSARY };
      }
      return existing.glossary; // no verse to connect, just return
    }

    // CASE 3: term doesn't exist at all → create new glossary with verses
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

    await this.glossaryRepo.save(glossary);

    return {message: MESSAGE_KEYS.ADDED_TO_GLOSSARY};
  }


  async findAll() {
    return await this.glossaryRepo.find({
      relations: ['verses', 'translations'],
    });
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

    return await this.glossaryRepo.save(glossary);
  }

  async remove(id: number) {
    const glossary = await this.findOne(id);
    await this.glossaryRepo.remove(glossary);
  }
}
