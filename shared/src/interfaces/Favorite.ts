import { Profile } from "./Profile";
import { VerseGroup } from "./VerseGroup";

export interface Favorite {
  id: number;
  profile: Profile;
  verseGroup: VerseGroup;
}