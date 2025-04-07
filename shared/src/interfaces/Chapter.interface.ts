import { BookKey } from "../enums";
import { Book } from "./Book.interface";
import { Verse } from "./Verse.interface";

export interface Chapter {
  id: number;
  num: number;
  verses: Verse[];
  book: Book;
}
