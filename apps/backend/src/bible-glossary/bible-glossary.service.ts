import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBibleGlossaryDto } from './dto/create-bible-glossary.dto';
import { UpdateBibleGlossaryDto } from './dto/update-bible-glossary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const termTitles = Object.values(dto.translations).map((t) => t.term.toLowerCase());
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
        existing.glossary.native = dto.native;
        await this.glossaryRepo.save(existing.glossary);

        return { message: MESSAGE_KEYS.CONNECTED_WITH_GLOSSARY };
      }
      return existing.glossary; // no verse to connect, just return
    }

    // CASE 3: term doesn't exist at all → create new glossary with verses
    const translations = Object.entries(dto.translations).map(([lang, value]) =>
      this.glossaryTranslationRepo.create({
        lang: lang as Lang,
        title: value.term.toLowerCase(),
      }),
    );

    const glossary = this.glossaryRepo.create({
      slug: dto.slug,
      native: dto.native,
      translations,
    });

    if (dto.verseIds?.length) {
      const verses = await this.versesService.findVersesByIds(dto.verseIds);
      glossary.verses = verses;
    }

    await this.glossaryRepo.save(glossary);
    return { message: MESSAGE_KEYS.ADDED_TO_GLOSSARY };
  }


  async findAll(query?: { slug: string }) {
    const slug = query?.slug;
    return await this.glossaryRepo.find({
      where: {
        ...(slug && { slug: query.slug })
      },
      ...(slug ? { relations: ['verses', 'translations'] } : {}),
    });
  }

  async checkExistByTitle(title: string) {
    const normalizedTitle = title.normalize("NFC");

    const exists = await this.glossaryRepo
      .createQueryBuilder("g")
      .leftJoin("g.translations", "t")
      .where("g.native = :title", { title: normalizedTitle })
      .orWhere("t.title = :title", { title: normalizedTitle })
      .getExists();

    return exists;
  }

  async findOne(slug: string) {
    const glossary = await this.glossaryRepo.findOne({
      where: { slug },
      relations: ['verses', 'translations'],
    });

    if (!glossary) throw new NotFoundException(ERROR_KEYS.GLOSSARY_NOT_FOUND);

    return glossary;
  }

  async update(slug: string, dto: UpdateBibleGlossaryDto) {
    const glossary = await this.findOne(slug);

    Object.assign(glossary, dto);

    if (dto.verseIds) {
      const verses = await this.versesService.findVersesByIds(dto.verseIds);
      glossary.verses = verses;
    }

    return await this.glossaryRepo.save(glossary);
  }

  async remove(slug: string) {
    const glossary = await this.findOne(slug);
    await this.glossaryRepo.remove(glossary);
  }
}
