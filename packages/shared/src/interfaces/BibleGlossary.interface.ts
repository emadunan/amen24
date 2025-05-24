import { GlossaryCategory } from "../enums";
import { BibleGlossaryTranslation } from "./BibleGlossaryTranslation.interface";
import { Verse } from "./Verse.interface";

export interface BibleGlossary {
  id: number;
  slug: string;
  native: string;
  category: GlossaryCategory;
  verses: Verse[];
  translations: BibleGlossaryTranslation[];
}