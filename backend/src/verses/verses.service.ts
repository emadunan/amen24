import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import {
  BookKey,
  BookKeys,
  Lang,
  normalizeArabicText,
} from '@amen24/shared';
import { ChaptersService } from '../chapters/chapters.service';

@Injectable()
export class VersesService {
  constructor(
    @InjectRepository(Verse) private versesRepo: Repository<Verse>,
    private chaptersService: ChaptersService,
  ) {}

  create(createVerseDto: CreateVerseDto) {
    return 'This action adds a new verse';
  }

  findAll() {
    return `This action returns all verses`;
  }

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
