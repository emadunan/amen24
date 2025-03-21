import { Chapter } from '../../chapters/entities/chapter.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BookKey } from '@amen24/shared';

@Entity()
export class Book {
  @PrimaryColumn({ type: 'text' })
  bookKey: BookKey;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}
