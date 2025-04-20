import { Lang } from "../enums";
import { Featured } from "./Featured.interface";

export interface FeaturedText {
  id: number;
  lang: Lang;
  text: string;
  featured: Featured;
}