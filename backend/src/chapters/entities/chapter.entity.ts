import { Book } from '../../books/entities/book.entity';
import { Verse } from '../../verses/entities/verse.entity';
import {
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Unique(['book', 'num'])
@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @ManyToOne(() => Book, (book) => book.chapters, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  book: Book;

  @OneToMany(() => Verse, (verse) => verse.chapter)
  verses: Verse[];
}
