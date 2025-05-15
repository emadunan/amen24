import { PartialType } from '@nestjs/mapped-types';
import { CreateSysLogDto } from './create-sys-log.dto';

export class UpdateSysLogDto extends PartialType(CreateSysLogDto) {}
