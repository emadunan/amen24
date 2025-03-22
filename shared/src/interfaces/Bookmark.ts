import { BookKey } from "../@types";
import { Profile } from "./Profile";

export interface Bookmark {
  id: number;
  title: string;
  profileEmail: string;
  profile: Profile;
  bookKey: BookKey;
  chapterNo: number;
  verseNo: number;
  updatedAt: Date;
}