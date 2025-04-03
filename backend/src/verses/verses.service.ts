import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { SingleBar, Presets } from 'cli-progress';
import {
  BookKey,
  bookKeyMap,
  Lang,
  normalizeArText,
  removeArDiacritics,
  detectLanguage,
} from '@amen24/shared';

@Injectable()
export class VersesService {
  constructor(@InjectRepository(Verse) private versesRepo: Repository<Verse>) {}

  async findChapter(bookKey: BookKey, chapterNo: number, lang: Lang) {
    return await this.versesRepo.find({
      where: {
        bookKey,
        chapterNo,
        lang,
      },
      order: {
        verseNo: 'ASC',
      },
    });
  }

  async findOne(
    bookKey: BookKey,
    chapterNo: number,
    verseNo: number,
    lang: Lang,
  ) {
    return await this.versesRepo.findOne({
      where: {
        bookKey,
        chapterNo,
        verseNo,
        lang,
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

    const pgLang = this.getTsLang(detectedLang); // PostgreSQL full-text search language

    // Convert to tsquery format for full-text search
    const tsQuery = processedQuery
      .split(/\s+/) // Ensure it handles multiple spaces properly
      .map((word) => `${word}:*`) // Add wildcard for partial matching
      .join(' & '); // Use AND logic

    const results = await this.versesRepo.query(
      `SELECT "bookKey", "chapterNo", "verseNo", "text", "lang"
       FROM "verse"
       WHERE "lang" = $1
       AND "bookKey" = ANY($2)
       AND "textSearch" @@ to_tsquery($3, $4)
       ORDER BY "bookKey", "chapterNo", "verseNo"`,
      [detectedLang, scope, pgLang, tsQuery],
    );

    return results;
  }

  async seed() {
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
          const bookKeySegment = result.at(1)?.toUpperCase();
          if (!bookKeySegment) throw new Error('Failed to extract book key');

          const bookKey = bookKeyMap[bookKeySegment];
          const chapterNo = +(result.at(2) as string);
          const verseNo = +(result.at(3) as string);
          let text = result.at(4) as string;

          let textNormalized = text;
          let textDiacritized = text;

          if (lang === Lang.ARABIC) {
            text = removeArDiacritics(text);
            textNormalized = normalizeArText(text);
          }

          const pgLang = this.getTsLang(lang);

          await this.versesRepo.query(
            `INSERT INTO "verse" ("bookKey", "chapterNo", "verseNo", "text", "textNormalized", "textDiacritized", "lang", "textSearch")
             VALUES ($1, $2, $3, $4, $5, $6, $7, to_tsvector($8, $5))`,
            [
              bookKey,
              chapterNo,
              verseNo,
              text,
              textNormalized,
              textDiacritized,
              lang,
              pgLang,
            ],
          );

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

  private getTsLang(lang: Lang) {
    return (
      {
        [Lang.ENGLISH]: 'english',
        [Lang.ARABIC]: 'arabic',
      }[lang] || 'simple'
    ); // Fallback to 'simple'
  }
}
