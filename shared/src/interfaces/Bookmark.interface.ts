import { Profile } from "./Profile.interface";
import { Verse } from "./Verse.interface";

export interface Bookmark {
  id: number;
  title: string;
  profile: Profile;
  verse: Verse;
  updatedAt: Date;
}
