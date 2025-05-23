import { IsString, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateBibleGlossaryDto {
  @IsString()
  slug: string;

  @IsString()
  native: string;

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
