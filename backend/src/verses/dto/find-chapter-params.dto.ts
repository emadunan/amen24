import { BibleBook, Language } from '@amen24/shared';

export class FindChapterParamsDto {
  title: BibleBook;
  chapterNum: number;
  lang: Language;
}
