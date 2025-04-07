import { BookKey, Lang } from "../enums";

export interface VerseResult {
  id: number;
  bookKey: BookKey;
  chapterNum: number;
  verseNum: number;
  text: string;
  lang: Lang;
}