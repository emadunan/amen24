import { FeaturedText } from "./FeaturedText.interface";
import { VerseGroup } from "./VerseGroup.interface";

export interface Featured {
  id: number;
  verseGroup: VerseGroup;
  featuredText: FeaturedText[];
}