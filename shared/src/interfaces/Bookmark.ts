import { Profile } from "./Profile";
import { Verse } from "./Verse";

export interface Bookmark {
  id: number;
  title: string;
  profile: Profile;
  verse: Verse;
  updatedAt: Date;
}
