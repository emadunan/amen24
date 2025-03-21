import { BookKey, Lang } from "../@types";

export interface Verse {
  bookKey: BookKey;
  chapterNo: number;
  verseNo: number;
  text: string;
  textNormalized: string;
  textDiacritized: string;
  lang: Lang;
}
