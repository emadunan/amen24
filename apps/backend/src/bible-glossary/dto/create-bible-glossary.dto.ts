import { GlossaryCategory } from '@amen24/shared';
import { IsString, IsArray, IsOptional, IsObject, IsEnum } from 'class-validator';

export class CreateBibleGlossaryDto {
  @IsString()
  slug: string;

  @IsString()
  native: string;

  @IsOptional()
  @IsEnum(GlossaryCategory)
  category: GlossaryCategory;

  @IsObject()
  translations: {
    [langCode: string]: {
      term: string;
      definition: string;
    };
  };

  @IsOptional()
  @IsArray()
  verseIds?: number[];
}
