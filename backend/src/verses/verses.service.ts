import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import {
  BookKey,
  bookKeyMap,
  Lang,
  normalizeArText,
  removeArDiacritics,
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

  async seed() {
    await this.seedBible(Lang.ENGLISH);
    await this.seedBible(Lang.ARABIC);
  }

  private async seedBible(lang: Lang) {
    console.log(`Seeding ${lang}...`);

    let filename: string;

    switch (lang) {
      case Lang.NATIVE:
        filename = 'original-scripts.txt';
        break;

      case Lang.ENGLISH:
        filename = 'Bible_En_ESV_2001.VPL.txt';
        break;

      case Lang.ARABIC:
        filename = 'Bible_Ar_SVD_1865.VPL.txt';
        break;

      default:
        throw new BadRequestException('Language miss configurations!');
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

    for (const line of lines) {
      const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

      if (result) {
        const bookKeySegment = result.at(1)?.toUpperCase();

        if (!bookKeySegment) throw new Error("Failed to extract book key from file");

        const bookKey = bookKeyMap[bookKeySegment];
        const chapterNo = +(result.at(2) as string);
        const verseNo = +(result.at(3) as string);
        const text = result.at(4) as string;

        switch (lang) {
          case Lang.ENGLISH:
            await this.versesRepo.insert({
              bookKey,
              chapterNo,
              verseNo,
              text,
              textNormalized: text,
              textDiacritized: text,
              lang,
            });

            break;

          case Lang.ARABIC:
            await this.versesRepo.insert({
              bookKey,
              chapterNo,
              verseNo,
              text: removeArDiacritics(text),
              textNormalized: normalizeArText(text),
              textDiacritized: text,
              lang,
            });

            break;

          default:
            throw new BadRequestException('Language miss configurations!');
        }
      }
    }
  }
}
