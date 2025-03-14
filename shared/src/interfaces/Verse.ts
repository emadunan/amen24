import { BookKey, Lang } from "../@types";

export interface Verse {
  id: number;
  num: number;
  text: string;
  textNormalized: string;
}

export interface VerseResultData {
  id: number;
  bookId: number;
  bookKey: BookKey;
  chapterNumber: number;
  totalChapters: number;
  verseNumber: number;
  text: string;
  textNormalized: string;
  lang: Lang;
}