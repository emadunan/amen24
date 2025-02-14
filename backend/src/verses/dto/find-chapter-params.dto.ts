import { BibleBook, Language } from 'shared';

export class FindChapterParamsDto {
  title: BibleBook;
  chapterNum: number;
  lang: Language;
}
