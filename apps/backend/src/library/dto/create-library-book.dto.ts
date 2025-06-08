import { ApprovalStatus, BookCategory, Church, Denomination, Lang } from "@amen24/shared";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLibraryBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  description: string;

  @IsEnum(BookCategory)
  category: BookCategory;

  @IsEnum(Denomination)
  denomination: Denomination;

  @IsEnum(Church)
  @IsOptional()
  church: Church;

  @IsEnum(Lang)
  lang: Lang;

  @IsOptional()
  year: number;
}