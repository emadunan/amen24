import { LibraryBook } from "@amen24/shared";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateLibraryChapterDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  normalizedContent: string;

  @IsOptional()
  book: LibraryBook;

  @IsString()
  slug: string;
}