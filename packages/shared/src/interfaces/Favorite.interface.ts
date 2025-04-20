import { Profile } from "./Profile.interface";
import { VerseGroup } from "./VerseGroup.interface";

export interface Favorite {
  id: number;
  profile: Profile;
  verseGroup: VerseGroup;
}