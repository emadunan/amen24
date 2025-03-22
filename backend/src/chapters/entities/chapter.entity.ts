import { BookKey } from '@amen24/shared';
import { Book } from '../../books/entities/book.entity';
import { Verse } from '../../verses/entities/verse.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryColumn({ type: 'text' })
  bookKey: BookKey;

  @PrimaryColumn({ type: 'smallint' })
  chapterNo: number;

  @ManyToOne(() => Book, (book) => book.chapters, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'bookKey' })
  book: Book;

  @OneToMany(() => Verse, (verse) => verse.chapter)
  verses: Verse[];
}
