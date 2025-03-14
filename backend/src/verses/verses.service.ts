import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Brackets, Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import {
  BookKey,
  BookKeys,
  Lang,
  normalizeArabicText,
  VerseResultData,
} from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';

@Injectable()
export class VersesService {
  constructor(
    @InjectRepository(Verse) private versesRepo: Repository<Verse>,
    private chaptersService: ChaptersService,
  ) { }

  async findChapter(
    bookKey: BookKey,
    chapterNumber: number,
    lang: Lang,
  ) {
    return await this.versesRepo.find({
      where: {
        chapter: { num: chapterNumber, book: { title: bookKey } },
        lang,
      },
      order: {
        num: 'ASC',
      },
    });
  }

  async findVerses(query: string, selectedBooks: BookKey[]): Promise<VerseResultData[]> {
    console.log(selectedBooks);

    if (!query.trim()) return [];

    const formattedQuery = query.trim().replace(/\s+/g, ' & ');

    return this.versesRepo
      .createQueryBuilder('verse')
      .select([
        'verse.id AS "id"',
        'verse.num AS "verseNumber"',
        'verse.text AS "text"',
        'verse.textNormalized AS "textNormalized"',
        'verse.lang AS "lang"',
        'chapter.num AS "chapterNumber"',
        'book.title AS "bookKey"',
        'book.id AS "bookId"',
      ])
      .innerJoin('verse.chapter', 'chapter')
      .innerJoin('chapter.book', 'book')
      .where(
        new Brackets((qb) => {
          qb.where('verse.textNormalized ILIKE :exactMatch', { exactMatch: `%${query}%` })
            .orWhere(`to_tsvector('english', verse.textNormalized) @@ to_tsquery(:searchQuery)`, {
              searchQuery: formattedQuery,
            });
        })
      )
      .andWhere(selectedBooks.length > 0 ? 'book.title IN (:...books)' : '1=1', { books: selectedBooks })
      .orderBy('book.title', 'ASC')
      .addOrderBy('chapter.num', 'ASC')
      .addOrderBy('verse.num', 'ASC')
      .getRawMany();
  }


  findOne(id: number) {
    return `This action returns a #${id} verse`;
  }

  update(id: number, updateVerseDto: UpdateVerseDto) {
    return `This action updates a #${id} verse`;
  }

  remove(id: number) {
    return `This action removes a #${id} verse`;
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
        filename =
          'Bible_En_ESV_2001.VPL.txt';
        break;

      case Lang.ARABIC:
        filename =
          'Bible_Ar_SVD_1865.VPL.txt';
        break;

      default:
        throw new BadRequestException('Language miss configurations!');
        break;
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
        const bookKey = result.at(1)?.toUpperCase() as keyof typeof BookKeys;
        const chapterNum = result.at(2) as string;
        const verseNum = result.at(3) as string;
        const verseText = result.at(4) as string;

        const bookId = BookKeys[bookKey].id;

        const chapter = await this.chaptersService.findOneByBookId(
          bookId,
          +chapterNum,
        );

        await this.versesRepo.insert({
          num: +verseNum,
          text: verseText,
          textNormalized:
            lang === Lang.ARABIC
              ? normalizeArabicText(verseText)
              : verseText,
          chapter: { id: chapter!.id },
          lang,
        });
      }
    }
  }
}
