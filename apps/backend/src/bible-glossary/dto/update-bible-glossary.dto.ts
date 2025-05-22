import { PartialType } from '@nestjs/mapped-types';
import { CreateBibleGlossaryDto } from './create-bible-glossary.dto';

export class UpdateBibleGlossaryDto extends PartialType(
  CreateBibleGlossaryDto,
) {}
