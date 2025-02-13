import { PartialType } from '@nestjs/mapped-types';
import { CreateVersesNativeDto } from './create-verse-native.dto';

export class UpdateVersesNativeDto extends PartialType(CreateVersesNativeDto) { }
