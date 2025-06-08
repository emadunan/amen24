import { Lang } from "../enums";
import { LibraryBook } from "./LibraryBook.interface";


export interface LibraryChapter {
  id: string;
  title: string;
  order: number;
  content: string;
  normalizedContent: string;
  book: LibraryBook;
}

export interface CreateLibraryChapterDto {
  title: string;
  order: number;
  lang: Lang;
  content: string;
  normalizedContent: string;
  bookId: string;
}