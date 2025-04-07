import { BookKey } from "../enums";
import { Chapter } from "./Chapter.interface";

export interface Book {
  id: number;
  bookKey: BookKey;
  chapters: Chapter[];
}
