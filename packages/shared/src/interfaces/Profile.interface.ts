import { DateCalendar, Lang, ThemeMode, UserRole } from "../enums";
import { Favorite } from "./Favorite.interface";
import { User } from "./User.interface";

export interface Profile {
  email: string;
  users: User[];
  roles: UserRole[];
  createdAt: Date;
  lastLogin: Date;
  uiLang: Lang | null;
  fontSize: number;
  themeMode: ThemeMode;
  dateCalendar: DateCalendar;
  isDiacritized: boolean;
  favorites: Favorite[]
}

export interface ProfileStatistics {
  users: {
    total: number,
    loggedInToday: number,
    createdToday: number,
  },
  uiLang: {
    en: number,
    ar: number,
  },
  theme: {
    light: number,
    dark: number,
  },
  calendars: {
    gregorian: number,
    hebrew: number,
    coptic: number,
  },
  providers: {
    local: number,
    google: number,
    facebook: number,
  }
}
