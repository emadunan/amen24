import { Book } from "src/books/entities/book.entity";
import { VerseEn } from "src/verses-en/entities/verse-en.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @ManyToOne(() => Book, (book) => book.chapters)
  book: Book;

  @OneToMany(() => VerseEn, verseEn => verseEn.chapter)
  versesEn: VerseEn[]
}
