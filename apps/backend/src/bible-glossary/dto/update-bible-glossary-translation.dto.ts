import { PartialType } from '@nestjs/mapped-types';
import { CreateBibleGlossaryTranslationDto } from './create-bible-glossary-translation.dto';

export class UpdateBibleGlossaryTranslationDto extends PartialType(
  CreateBibleGlossaryTranslationDto,
) {}
