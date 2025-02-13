import { Book } from "../../books/entities/book.entity";
import { VerseEn } from "../../verses-en/entities/verse-en.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
