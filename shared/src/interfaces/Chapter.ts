import { BookKey } from "../@types";
import { Book } from "./Book";
import { Verse } from "./Verse";

export interface Chapter {
  id: number;
  num: number;
  verses: Verse[];
  book: Book;
}
