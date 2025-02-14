import { Book } from 'src/books/entities/book.entity';

export class CreateChapterDto {
  num: number;
  book: Book;
}
