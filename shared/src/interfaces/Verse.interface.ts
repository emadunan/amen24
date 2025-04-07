import { Chapter } from "./Chapter.interface";
import { VerseGroup } from "./VerseGroup.interface";
import { VerseTranslation } from "./VerseTranslation.interface";

export interface Verse {
  id: number;
  num: number;
  chapter: Chapter;
  verseGroups: VerseGroup[];
  verseTranslations: VerseTranslation[];
}
