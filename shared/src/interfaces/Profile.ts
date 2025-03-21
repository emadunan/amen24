import { DateCalendar, Lang, ThemeMode, UserCategory } from "../@types";
import { User } from "./User";

export interface Profile {
  email: string;
  users: User[];
  privilege: UserCategory;
  createdAt: Date;
  lastLogin: Date;
  uiLang: Lang;
  fontSize: number;
  themeMode: ThemeMode;
  dateCalendar: DateCalendar;
  isDiacritized: boolean;

  // bookmarks: Bookmark[];
}
