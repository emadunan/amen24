import { Favorite } from "./Favorite";
import { Verse } from "./Verse";

export interface VerseGroup {
  id: number;
  createdAt: Date;
  favorites: Favorite[];
  verses: Verse[];
}