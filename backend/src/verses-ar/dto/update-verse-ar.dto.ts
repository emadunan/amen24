import { PartialType } from '@nestjs/mapped-types';
import { CreateVersesArDto } from './create-verse-ar.dto';

export class UpdateVersesArDto extends PartialType(CreateVersesArDto) { }
