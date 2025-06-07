import { Lang } from "@amen24/shared";
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLibraryChapterDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsEnum(Lang)
  lang: Lang;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  normalizedContent: string;

  @IsUUID()
  bookId: string;
}