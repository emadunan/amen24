import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
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
} from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';
import { VerseTranslation } from './entities/verse-translation.entity';

@Injectable()
export class VersesService {
  constructor(
    @InjectRepository(Verse) private versesRepo: Repository<Verse>,
    @InjectRepository(VerseTranslation)
    private verseTranslationsRepo: Repository<VerseTranslation>,
    private chaptersService: ChaptersService,
  ) { }
  // TODO: Create constants and key: value pairs to handle errors and messages

  async findChapter(bookKey: BookKey, chapterNum: number, lang: Lang) {
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

  async findManyByQuery(query: string, scope: BookKey[]) {
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
      '_content',
      'Bible_En_ESV_2001.VPL.txt',
    );

    const fileContent = readFileSync(contentFilePath, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
      const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

      if (result) {
        const bookKey = result.at(1)?.toUpperCase() as BookKey;
        if (!bookKey) throw new BadRequestException('Failed to extract book key');

        const chapterNum = +(result.at(2) as string);
        const verseNum = +(result.at(3) as string);

        // Retrieve or create the chapter
        const chapter = await this.chaptersService.findOne(bookKey, chapterNum);
        if (!chapter) throw new BadRequestException('Chapter has not been found!');

        await this.versesRepo.insert({ num: verseNum, chapter });
      }
    }
  }

  async seed() {
    await this.structure();
    await this.seedBible(Lang.ENGLISH);
    await this.seedBible(Lang.ARABIC);
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
        '_content',
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
          if (!bookKey) throw new BadRequestException('Failed to extract book key');

          const chapterNum = +(result.at(2) as string);
          const verseNum = +(result.at(3) as string);
          let text = result.at(4) as string;

          let textNormalized = text;
          let textDiacritized = text;

          if (lang === Lang.ARABIC) {
            text = replaceWaslaAlef(text);
            text = removeArDiacritics(text);
            textNormalized = normalizeArText(text);
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
}
