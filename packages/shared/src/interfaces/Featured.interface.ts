import { FeaturedPosition } from "../enums";
import { FeaturedText } from "./FeaturedText.interface";
import { VerseGroup } from "./VerseGroup.interface";

export interface Featured {
  id: number;
  verseGroup: VerseGroup;
  featuredText: FeaturedText[];
  position: FeaturedPosition;
}