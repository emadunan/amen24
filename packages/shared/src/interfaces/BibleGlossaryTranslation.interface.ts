import { Lang } from "../enums";
import { BibleGlossary } from "./BibleGlossary.interface";

export interface BibleGlossaryTranslation {
  id: number;
  lang: Lang;
  term: string;
  definition: string;
  oldDefinition: string;
  glossary: BibleGlossary;
}