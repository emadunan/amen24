import { PartialType } from '@nestjs/mapped-types';
import { CreateVersesEnDto } from './create-verse-en.dto';

export class UpdateVersesEnDto extends PartialType(CreateVersesEnDto) { }
