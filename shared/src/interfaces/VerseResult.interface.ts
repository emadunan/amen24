import { BookKey, Lang } from "../@types";

export interface VerseResult {
  id: number;
  bookKey: BookKey;
  chapterNum: number;
  verseNum: number;
  text: string;
  lang: Lang;
}