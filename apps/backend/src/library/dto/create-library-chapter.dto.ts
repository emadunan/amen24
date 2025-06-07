import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateLibraryChapterDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  content: string;

  @IsString()
  normalizedContent: string;

  @IsUUID()
  bookId: string;
}