import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { Repository } from 'typeorm';
import { InsertChapterDto } from './dto/insert-chapter.dto';
import { BookKey } from '@amen24/shared';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter) private chaptersRepo: Repository<Chapter>,
  ) {}

  async insert(insertChapterDto: InsertChapterDto) {
    return await this.chaptersRepo.insert(insertChapterDto);
  }

  async findOneById(id: number) {
    return await this.chaptersRepo.findOneBy({ id });
  }

  async findOne(bookKey: BookKey, chapterNum: number) {
    return await this.chaptersRepo.findOne({
      where: {
        num: chapterNum,
        book: {
          bookKey,
        },
      },
    });
  }
}
