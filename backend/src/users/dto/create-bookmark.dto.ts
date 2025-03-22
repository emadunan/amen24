import { BookKey } from "@amen24/shared";
import { IsEmail, IsNumber, IsObject, IsString } from "class-validator";

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsEmail()
  profileEmail: string;

  @IsString()
  bookKey: BookKey;

  @IsNumber()
  chapterNo: number;

  @IsNumber()
  verseNo: number;
}