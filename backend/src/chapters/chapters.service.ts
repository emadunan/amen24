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
    await this.chaptersRepo.insert(insertChapterDto);
  }

  async findOne(bookKey: BookKey, chapterNo: number) {
    return await this.chaptersRepo.findOne({
      where: { bookKey, chapterNo },
    });
  }
}
