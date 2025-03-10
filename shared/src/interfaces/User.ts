import { BookKey, Lang, ThemeMode, UserCategory } from "../@types";
import { Profile } from "./Profile";

export interface User {
  id: string;
  password: string;
  provider: string;
  providerId: string;
  profile: Profile;
  email: string;
  displayName: string;
  photoUri: string;
  isActive: boolean;
  isVerified: boolean;
}

export interface UserProfile {
  id: string;
  password: string;
  provider: string;
  providerId: string;
  email: string;
  displayName: string;
  photoUri: string;
  isActive: boolean;
  isVerified: boolean;
  privilege: UserCategory;
  createdAt: Date;
  lastLogin: Date;
  currentBook: BookKey;
  currentChapter: number;
  themeMode: ThemeMode;
  uilanguage: Lang;
  fontSize: number;
  isDiacritized: boolean;
}
