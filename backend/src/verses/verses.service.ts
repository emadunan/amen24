import { Injectable } from '@nestjs/common';
import { CreateVerseDto } from './dto/create-verse.dto';
import { UpdateVerseDto } from './dto/update-verse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Verse } from './entities/verse.entity';
import { Repository } from 'typeorm';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { BookKeys, Language, normalizeArabicText } from '@amen24/shared';
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
    const contentFilePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'content',
      'Holy-Bible---Arabic---Arabic-Van-Dyck-Bible---Source-Edition.VPL.txt',
    );

    const fileContent = readFileSync(contentFilePath, 'utf-8');

    const lines = fileContent.split('\n');

    for (const line of lines) {
      const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

      if (result) {
        const bookKey = result.at(1) as keyof typeof BookKeys;
        const chapterNum = result.at(2) as string;
        const verseNum = result.at(3) as string;
        const verseText = result.at(4) as string;

        const bookId = BookKeys[bookKey].id;

        const chapter = await this.chaptersService.findOneByBookId(
          bookId,
          +chapterNum,
        );

        if (!chapter) {
          console.log("CHAPTER!! ", bookKey, chapterNum, verseText);
          
          return;
        }

        await this.versesRepo.insert({
          num: +verseNum,
          text: verseText,
          textNormalized: normalizeArabicText(verseText),
          chapter: { id: chapter.id },
          language: Language.ARABIC,
        });
      }
    }
  }
}
