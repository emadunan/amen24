import { Book } from "src/books/entities/book.entity";

export class InsertChapterDto {
  num: number;
  book: Partial<Book>;
}