import { Chapter } from '../../chapters/entities/chapter.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookKey } from '@amen24/shared';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookKey: BookKey;

  @OneToMany(() => Chapter, (chapter) => chapter.book)
  chapters: Chapter[];
}
