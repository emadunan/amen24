import { Lang } from "../enums";
import { BibleGlossary } from "./BibleGlossary.interface";

export interface BibleGlossaryTranslation {
  id: number;
  lang: Lang;
  title: string;
  description: string;
  glossary: BibleGlossary;
}