import { BookKey } from "../enums";
import { Chapter } from "./Chapter.interface";

export interface Book {
  id: number;
  slug: string;
  bookKey: BookKey;
  chapters: Chapter[];
}
