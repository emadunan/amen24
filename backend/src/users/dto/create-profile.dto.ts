import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { BookKey, Lang, ThemeMode, UserCategory } from '@amen24/shared';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsEnum(UserCategory)
  privilege: UserCategory;

  @IsDate()
  lastLogin: Date;

  @IsEnum(BookKey)
  currentBook: BookKey;

  @IsNumber()
  currentChapter: number;

  @IsEnum(Lang)
  @Optional()
  uilanguage: Lang;

  @IsNumber()
  fontSize: number;

  @IsBoolean()
  themeMode: ThemeMode;

  @IsBoolean()
  isDiacritized: boolean;
}
