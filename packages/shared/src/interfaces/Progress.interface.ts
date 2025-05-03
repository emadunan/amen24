import { Profile } from "./Profile.interface";
import { Verse } from "./Verse.interface";

export interface Progress {
  id: number;
  title: string;
  profile: Profile;
  verse: Verse;
  updatedAt: Date;
}
