import { ApprovalStatus, GlossaryCategory } from '@amen24/shared';
import {
  IsString,
  IsArray,
  IsOptional,
  IsObject,
  IsEnum,
} from 'class-validator';

export class CreateBibleGlossaryDto {
  @IsString()
  slug: string;

  @IsString()
  native: string;

  @IsOptional()
  @IsEnum(GlossaryCategory)
  category: GlossaryCategory;

  @IsOptional()
  @IsEnum(ApprovalStatus)
  approvalStatus?: ApprovalStatus;

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
