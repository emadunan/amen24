import { BookKey, Lang } from '@amen24/shared';

export class FindChapterParamsDto {
  title: BookKey;
  chapterNum: number;
  lang: Lang;
}
