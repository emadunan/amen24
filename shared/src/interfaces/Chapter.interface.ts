import { BookKey } from "../@types";
import { Book } from "./Book.interface";
import { Verse } from "./Verse.interface";

export interface Chapter {
  id: number;
  num: number;
  verses: Verse[];
  book: Book;
}
