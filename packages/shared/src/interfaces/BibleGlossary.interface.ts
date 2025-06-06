import { ApprovalStatus, GlossaryCategory, Lang } from "../enums";
import { BibleGlossaryTranslation } from "./BibleGlossaryTranslation.interface";
import { Verse } from "./Verse.interface";

export interface BibleGlossary {
  id: number;
  slug: string;
  native: string;
  category: GlossaryCategory;
  approvalStatus?: ApprovalStatus;
  verses: Verse[];
  translations: BibleGlossaryTranslation[];
}

export interface BibleGlossaryQuery {
  slug?: string;
  lang?: Lang;
  term?: string;
  bookKey?: string;
  chapter?: string;
  page?: number;
  limit?: number;
}