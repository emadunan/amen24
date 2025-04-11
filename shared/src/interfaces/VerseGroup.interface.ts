import { Favorite } from "./Favorite.interface";
import { Verse } from "./Verse.interface";

export interface VerseGroup {
  id: number;
  createdAt: Date;
  startingVerse: Verse;
  favorites: Favorite[];
  verses: Verse[];
}