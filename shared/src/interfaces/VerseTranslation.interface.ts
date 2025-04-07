import { Lang } from "../@types";
import { Verse } from "./Verse.interface";

export interface VerseTranslation {
  id: number;
  lang: Lang;
  text: string;
  textNormalized: string;
  textDiacritized?: string;
  verse?: Verse;
}