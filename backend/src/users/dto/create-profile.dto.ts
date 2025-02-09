import { IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsNumber } from "class-validator";
import { BibleBook, Language, UserCategory } from "src/@types";


export class CreateProfileDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsEnum(UserCategory)
  privilege: UserCategory;

  @IsDate()
  lastLogin: Date;

  @IsEnum(BibleBook)
  currentBook: BibleBook;

  @IsNumber()
  currentChapter: number;

  @IsEnum(Language)
  uilanguage: Language;

  @IsNumber()
  fontSize: number;

  @IsBoolean()
  darkMode: boolean;

  @IsBoolean()
  diacrited: boolean;
}