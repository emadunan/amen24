import { Chapter } from "./Chapter";
import { VerseGroup } from "./VerseGroup";
import { VerseTranslation } from "./VerseTranslation";

export interface Verse {
  id: number;
  num: number;
  chapter: Chapter;
  verseGroups: VerseGroup[];
  verseTranslations: VerseTranslation[];
}
