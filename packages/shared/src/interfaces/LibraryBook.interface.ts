import { BookCategory, Church, Denomination, Lang } from "../enums";
import { LibraryChapter } from "./LibraryChapter.interface";



export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  denomination: Denomination;
  church: Church;
  lang: Lang;
  year: number;
  chapters: LibraryChapter[];
  createdAt: Date;
  updatedAt: Date;
}