export interface Verse {
  id: number;
  num: number;
  text: string;
  textNormalized: string;
  textDiacritized: string;
}

export interface VerseWithMeta extends Verse {
  chapterNum: string;
  bookKey: string;
  bookId: number;
  bookLen: number;
}

export interface VerseWithTranslation {
  id: number;
  num: number;
  text: string;
  textDiacritized: string;
  text2: string;
  text2Diacritized: string;
}
