import { BibleBook, Language, UserCategory } from "../@types";
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
}

export interface UserProfile {
  userId: string;
  password: string;
  provider: string;
  providerId: string;
  email: string;
  displayName: string;
  photoUri: string;
  isActive: boolean;
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
