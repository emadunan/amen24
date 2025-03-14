import { BookKey, Lang, ThemeMode, UserCategory } from "../@types";

export interface Profile {
  email: string;
  privilege: UserCategory;
  createdAt: Date;
  lastLogin: Date;
  currentBook: BookKey;
  currentChapter: number;
  uilanguage: Lang;
  fontSize: number;
  themeMode: ThemeMode;
  isDiacritized: boolean;
}
