import { DateCalendar, Lang, ThemeMode, UserPrivilege } from "../enums";
import { User } from "./User.interface";

export interface Profile {
  email: string;
  users: User[];
  privilege: UserPrivilege;
  createdAt: Date;
  lastLogin: Date;
  uiLang: Lang | null;
  fontSize: number;
  themeMode: ThemeMode;
  dateCalendar: DateCalendar;
  isDiacritized: boolean;

  // bookmarks: Bookmark[];
}
