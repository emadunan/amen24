export interface IVerse {
  id: number;
  text: string;
  verseNum: number;
  chapterNum: string;
  bookKey: string;
  bookId: number;
  bookLen: number;
}

export interface IVerseRaw {
  id: number;
  num: number;
  text: string;
  textNormalized: string;
  chapterId: number;
}
