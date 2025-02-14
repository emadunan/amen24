import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { BibleBook, Language, UserCategory } from '@amen24/shared';

export class CreateProfileDto {
  @IsEmail()
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
  @Optional()
  uilanguage: Language;

  @IsNumber()
  fontSize: number;

  @IsBoolean()
  darkMode: boolean;

  @IsBoolean()
  diacrited: boolean;
}
