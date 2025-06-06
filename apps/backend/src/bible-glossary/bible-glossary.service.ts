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
import { BibleGlossaryQuery, ERROR_KEYS, Lang, MESSAGE_KEYS, normalizeText } from '@amen24/shared';
import { VersesService } from '../verses/verses.service';
import { UpdateBibleGlossaryTranslationDto } from './dto/update-bible-glossary-translation.dto';
import { OpenAiService } from 'src/openai/openai.service';

@Injectable()
export class BibleGlossaryService {
  constructor(
    @InjectRepository(BibleGlossary)
    private glossaryRepo: Repository<BibleGlossary>,

    @InjectRepository(BibleGlossaryTranslation)
    private glossaryTranslationRepo: Repository<BibleGlossaryTranslation>,

    private versesService: VersesService,
    private readonly openAi: OpenAiService,
  ) { }

  async create(dto: CreateBibleGlossaryDto) {
    const terms = Object.values(dto.translations).map((bgItem) =>
      bgItem.term.toLowerCase(),
    );
    const targetVerseId = dto.verseIds?.[0];

    const existing = await this.glossaryTranslationRepo.findOne({
      where: { term: In(terms) },
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
          term: existing.term,
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
        term: value.term.toLowerCase(),
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

  async findAll(query?: BibleGlossaryQuery) {
    const page = query?.page ?? 1;
    const limit = Math.min(query?.limit ?? 20, 100);

    const qb = this.glossaryRepo.createQueryBuilder('glossary')
      .leftJoinAndSelect('glossary.translations', 'translation')
      .leftJoinAndSelect('glossary.verses', 'verse')
      .leftJoinAndSelect('verse.chapter', 'chapter')
      .leftJoinAndSelect('chapter.book', 'book');

    if (query?.slug) {
      qb.andWhere('glossary.slug = :slug', { slug: query.slug });
    }

    if (query?.lang) {
      qb.andWhere('translation.lang = :lang', { lang: query.lang });
    }

    if (query?.term) {
      const normalizedTerm = normalizeText(query.term, query.lang || Lang.ENGLISH)
      qb.andWhere('translation.termNormalized ILIKE :term', { term: `%${normalizedTerm}%` });
    }

    if (query?.bookKey) {
      qb.andWhere('book.bookKey = :bookKey', { bookKey: query.bookKey });
    }

    if (query?.chapter) {
      qb.andWhere('chapter.num = :chapter', {
        chapter: Number(query.chapter),
      });
    }

    qb.orderBy('translation.term', 'ASC');

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }



  async checkExistByTerm(term: string) {
    const normalizedTerm = term.normalize('NFC');

    const exists = await this.glossaryRepo
      .createQueryBuilder('g')
      .leftJoin('g.translations', 't')
      .where('g.native = :term', { term: normalizedTerm })
      .orWhere('t.term = :term', { term: normalizedTerm })
      .getExists();

    return exists;
  }

  async findOne(slug: string) {
    const glossary = await this.glossaryRepo
      .createQueryBuilder('glossary')
      .leftJoinAndSelect('glossary.verses', 'verse')
      .leftJoinAndSelect('glossary.translations', 'translation')
      .where('glossary.slug = :slug', { slug })
      .orderBy('translation.lang', 'ASC')
      .getOne();

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

  async updateTranslation(id: number, dto: UpdateBibleGlossaryTranslationDto) {
    const glossaryTranslation = await this.glossaryTranslationRepo.findOneBy({
      id,
    });

    if (!glossaryTranslation)
      throw new NotFoundException(ERROR_KEYS.GLOSSARY_NOT_FOUND);

    // Only update oldDefinition if the incoming update includes a new definition
    if (
      dto.definition !== undefined &&
      dto.definition !== glossaryTranslation.definition
    ) {
      glossaryTranslation.oldDefinition = glossaryTranslation.definition;
    }

    Object.assign(glossaryTranslation, dto);

    return await this.glossaryTranslationRepo.save(glossaryTranslation);
  }

  async remove(slug: string) {
    const glossary = await this.findOne(slug);
    await this.glossaryRepo.remove(glossary);
  }

  async createAiDefinition(slug: string, term: string, useCache: boolean): Promise<string> {
    return this.openAi.generateDefinition(slug, term, useCache);
  }
}
