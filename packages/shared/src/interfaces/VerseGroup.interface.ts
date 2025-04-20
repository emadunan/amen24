import { Favorite } from "./Favorite.interface";
import { Featured } from "./Featured.interface";
import { Verse } from "./Verse.interface";

export interface VerseGroup {
  id: number;
  createdAt: Date;
  startingVerse: Verse;
  favorites: Favorite[];
  featured: Featured;
  verses: Verse[];
}