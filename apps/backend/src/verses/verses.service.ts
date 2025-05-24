import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { In, Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { SingleBar, Presets } from 'cli-progress';
import {
  BookKey,
  Lang,
  normalizeArText,
  removeArDiacritics,
  detectLanguage,
  replaceWaslaAlef,
  removeNaDiacritics,
} from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';
import { VerseTranslation } from './entities/verse-translation.entity';
import { VerseGroup } from './entities/verse-group.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class VersesService {
  constructor(
    @InjectRepository(Verse) private versesRepo: Repository<Verse>,
    @InjectRepository(VerseGroup)
    private verseGroupRepo: Repository<VerseGroup>,
    @InjectRepository(VerseTranslation)
    private verseTranslationsRepo: Repository<VerseTranslation>,
    private chaptersService: ChaptersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findVersesByIds(verseIds: number[]) {
    if (!verseIds.length) {
      throw new BadRequestException('verseIds array is empty');
    }

    const verses = await this.versesRepo.find({
      where: { id: In(verseIds) },
      order: { id: 'ASC' },
    });

    if (verses.length !== verseIds.length) {
      const foundIds = new Set(verses.map((v) => v.id));
      const missingIds = verseIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException(
        `Verses not found for IDs: ${missingIds.join(', ')}`,
      );
    }

    return verses;
  }

  async createVerseGroup(verseIds: number[]): Promise<VerseGroup> {
    if (!verseIds.length)
      throw new BadRequestException('verseIds array is empty');

    const verses = await this.versesRepo.findBy({ id: In(verseIds) });

    if (verses.length !== verseIds.length) {
      throw new NotFoundException('One or more verses not found');
    }

    const startingVerse = verses.reduce(
      (min, v) => (v.id < min.id ? v : min),
      verses[0],
    );

    const group = this.verseGroupRepo.create({ startingVerse, verses });
    return this.verseGroupRepo.save(group);
  }

  async findVerseGroups() {
    return await this.verseGroupRepo.find({
      relations: ['startingVerse', 'verses', 'featured', 'favorites'],
    });
  }

  async findVerseGroupById(id: number): Promise<VerseGroup> {
    const group = await this.verseGroupRepo.findOne({
      where: { id },
      relations: ['startingVerse', 'verses', 'verses.verseTranslations'],
      order: { verses: { id: 'ASC' } },
    });

    if (!group) {
      throw new NotFoundException(`VerseGroup with ID ${id} not found`);
    }

    return group;
  }

  async findVerseGroupByVerseIds(
    verseIds: number[],
  ): Promise<VerseGroup | null> {
    if (!verseIds.length) return null;

    // Sort IDs to normalize
    const sortedVerseIds = [...verseIds].sort((a, b) => a - b);

    const matchingGroup = await this.verseGroupRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.verses', 'verse')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('vg.id')
          .from('verse_group', 'vg')
          .innerJoin('verse_group_verses', 'vgv', 'vgv."verseGroupId" = vg.id')
          .groupBy('vg.id')
          .having(
            'array_agg(DISTINCT vgv."verseId" ORDER BY vgv."verseId") = :verseIds',
          )
          .getQuery();

        return 'group.id IN ' + subQuery;
      })
      .setParameter('verseIds', sortedVerseIds)
      .getOne();

    return matchingGroup || null;
  }

  async deleteVerseGroup(id: number) {
    return await this.verseGroupRepo.delete(id);
  }

  async findChapter(
    bookKey: BookKey,
    chapterNum: number,
    lang: Lang,
    email?: string,
  ) {
    this.eventEmitter.emit('bible.open', {
      email,
      details: `${bookKey} ${chapterNum} in ${lang}`,
    });
    return await this.versesRepo.find({
      where: {
        chapter: {
          num: chapterNum,
          book: {
            bookKey,
          },
        },
        verseTranslations: {
          lang,
        },
      },
      order: {
        num: 'ASC',
      },
      relations: ['verseTranslations', 'chapter', 'chapter.book'],
    });
  }

  async getVerse(bookKey: BookKey, chapterNum: number, verseNum: number) {
    return this.versesRepo.findOneBy({
      num: verseNum,
      chapter: { num: chapterNum, book: { bookKey } },
    });
  }

  async findOne(
    bookKey: BookKey,
    chapterNum: number,
    verseNum: number,
    lang: Lang,
  ) {
    return await this.versesRepo.findOne({
      where: {
        num: verseNum,
        verseTranslations: {
          lang,
        },
        chapter: {
          num: chapterNum,
          book: {
            bookKey,
          },
        },
      },
    });
  }

  async findOneById(id: number) {
    return await this.versesRepo.findOne({ where: { id } });
  }

  async findOneByIdWithLang(id: number, lang: Lang) {
    return await this.versesRepo.findOne({
      where: {
        id,
        verseTranslations: {
          lang,
        },
      },
      relations: ['verseTranslations'],
    });
  }

  async findManyByQuery(query: string, scope: BookKey[], email?: string) {
    this.eventEmitter.emit('bible.search', { email, details: `${query}` });
    if (!query.trim()) {
      throw new BadRequestException('Search query cannot be empty.');
    }

    // Validate that at least one book is selected
    if (!scope.length) {
      throw new BadRequestException('At least one book must be selected.');
    }

    // Detect language using Unicode ranges
    const detectedLang = detectLanguage(query);

    // Normalize text if needed
    let processedQuery = query;
    if (detectedLang === Lang.ARABIC) {
      processedQuery = removeArDiacritics(normalizeArText(query));
    }

    const words = processedQuery
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    if (!words.length) {
      throw new BadRequestException(
        'Search query must contain at least one word.',
      );
    }

    // Build WHERE conditions
    const ilikeClauses = words.map(
      (_, idx) => `"textNormalized" ILIKE $${idx + 3}`,
    );
    const values = [detectedLang, scope, ...words.map((w) => `%${w}%`)];

    const results = await this.versesRepo.query(
      `SELECT
          v.id,
          b."bookKey",
          c."num" AS "chapterNum",
          v."num" AS "verseNum",
          vt."text",
          vt."lang"
        FROM "verse_translation" vt
        INNER JOIN "verse" v ON vt."verseId" = v."id"
        INNER JOIN "chapter" c ON v."chapterId" = c."id"
        INNER JOIN "book" b ON c."bookId" = b."id"
        WHERE vt."lang" = $1
          AND b."bookKey" = ANY($2)
          AND ${ilikeClauses.join(' AND ')}
        ORDER BY v.id
        LIMIT 9999`,
      values,
    );

    return results;
  }

  async structure() {
    const contentFilePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'documentation',
      'content',
      'Bible_En_ESV_2001.VPL.txt',
    );

    const fileContent = readFileSync(contentFilePath, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
      const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

      if (result) {
        const bookKey = result.at(1)?.toUpperCase() as BookKey;
        if (!bookKey)
          throw new BadRequestException('Failed to extract book key');

        const chapterNum = +(result.at(2) as string);
        const verseNum = +(result.at(3) as string);

        // Retrieve or create the chapter
        const chapter = await this.chaptersService.findOne(bookKey, chapterNum);
        if (!chapter)
          throw new BadRequestException('Chapter has not been found!');

        await this.versesRepo.insert({ num: verseNum, chapter });
      }
    }
  }

  async seed() {
    await this.structure();

    await this.seedBible(Lang.NATIVE);
    // await this.missingVerseLogger(Lang.NATIVE);

    await this.seedBible(Lang.ENGLISH);
    // await this.missingVerseLogger(Lang.NATIVE);

    await this.seedBible(Lang.ARABIC);
    // await this.missingVerseLogger(Lang.NATIVE);
  }

  private async missingVerseLogger(lang: Lang) {
    const allVerses = await this.versesRepo.find({
      relations: ['chapter', 'chapter.book'],
    });

    const translated = await this.verseTranslationsRepo.find({
      where: { lang },
      relations: ['verse'],
    });

    const translatedIds = new Set(translated.map((t) => t.verse.id));
    const missingVerses = allVerses.filter((v) => !translatedIds.has(v.id));

    if (missingVerses.length) {
      console.warn(
        `⚠️  Missing ${missingVerses.length} verses for ${lang.toUpperCase()}:`,
      );
      missingVerses.forEach((v) => {
        console.warn(`- ${v.chapter.book.bookKey} ${v.chapter.num}:${v.num}`);
      });
    } else {
      console.log(`✅ All verses are present for ${lang.toUpperCase()}`);
    }
  }

  private async seedBible(lang: Lang) {
    const progressBar = new SingleBar(
      {
        format: `${lang.toUpperCase()} {bar} {percentage}% | {value}/{total} verses`,
        hideCursor: true,
      },
      Presets.shades_classic,
    );

    try {
      let filename: string;
      switch (lang) {
        case Lang.NATIVE:
          filename = 'Bible_Native_MasoreticSBL.VPL.txt';
          break;
        case Lang.ENGLISH:
          filename = 'Bible_En_ESV_2001.VPL.txt';
          break;
        case Lang.ARABIC:
          filename = 'Bible_Ar_SVD_1865.VPL.txt';
          break;
        default:
          throw new BadRequestException('Language misconfiguration!');
      }

      const contentFilePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'documentation',
        'content',
        filename,
      );
      const fileContent = readFileSync(contentFilePath, 'utf-8');
      const lines = fileContent.split('\n');

      progressBar.start(lines.length, 0); // Start progress bar

      let processedCount = 0;

      for (const line of lines) {
        const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

        if (result) {
          const bookKey = result.at(1)?.toUpperCase() as BookKey;
          if (!bookKey)
            throw new BadRequestException('Failed to extract book key');

          const chapterNum = +(result.at(2) as string);
          const verseNum = +(result.at(3) as string);
          let text = result.at(4) as string;

          let textNormalized = text;
          const textDiacritized = text;

          if (lang === Lang.ARABIC) {
            text = replaceWaslaAlef(text);
            text = removeArDiacritics(text);
            textNormalized = normalizeArText(text);
          } else if (lang === Lang.NATIVE) {
            text = removeNaDiacritics(text);
            textNormalized = text;
          }

          const verse = await this.versesRepo.findOneBy({
            num: verseNum,
            chapter: { num: chapterNum, book: { bookKey } },
          });
          if (!verse) throw new BadRequestException('Verse has not been found');

          await this.verseTranslationsRepo.insert({
            text,
            textDiacritized,
            textNormalized,
            lang,
            verse: verse,
          });

          processedCount++;
          progressBar.update(processedCount);
        }
      }

      progressBar.stop();
      console.log('');
    } catch (error) {
      progressBar.stop();
      console.error(`Seeding ${lang} failed: ${error.message}`);
    }
  }

  async normalizeNativeVersesInBatches(batchSize = 1000) {
    let offset = 0;
    let processed = 0;

    while (true) {
      const batch = await this.verseTranslationsRepo
        .createQueryBuilder('vt')
        .where('vt.lang = :lang', { lang: Lang.NATIVE })
        .orderBy('vt.id')
        .offset(offset)
        .limit(batchSize)
        .getMany();

      if (!batch.length) break;

      const updated: VerseTranslation[] = [];

      for (const vt of batch) {
        const cleaned = removeNaDiacritics(vt.text ?? '');
        if (vt.text !== cleaned) {
          vt.text = cleaned;
          vt.textNormalized = cleaned;
          updated.push(vt);
        }
      }

      if (updated.length) {
        await this.verseTranslationsRepo.save(updated);
      }

      processed += batch.length;
      offset += batchSize;
      console.log(`✔️ Processed ${processed} translations so far...`);
    }

    console.log('✅ Finished normalizing all Native texts.');
  }
}
