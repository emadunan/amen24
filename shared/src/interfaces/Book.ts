import { BookKey } from "../@types";
import { Chapter } from "./Chapter";

export interface Book {
  id: number;
  bookKey: BookKey;
  chapters: Chapter[];
}
