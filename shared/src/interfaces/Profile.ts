import { BibleBook, Language, UserCategory } from "../@types";

export interface Profile {
  email: string;
  privilege: UserCategory;
  createdAt: Date;
  lastLogin: Date;
  currentBook: BibleBook;
  currentChapter: number;
  uilanguage: Language;
  fontSize: number;
  diacrited: boolean;
  darkMode: boolean;
}