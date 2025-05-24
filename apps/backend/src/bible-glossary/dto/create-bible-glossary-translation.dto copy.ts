import { Lang } from "@amen24/shared";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { BibleGlossary } from "../entities/bible-glossary.entity";

export class CreateBibleGlossaryTranslationDto {

  @IsEnum(Lang)
  lang: Lang;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  glossary: BibleGlossary;
}