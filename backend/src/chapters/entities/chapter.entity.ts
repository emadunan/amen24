import { Book } from "src/books/entities/book.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num: number;

  @ManyToOne(() => Book, (book) => book.chapters)
  book: Book;
}
