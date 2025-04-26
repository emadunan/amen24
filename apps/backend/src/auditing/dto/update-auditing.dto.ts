import { PartialType } from '@nestjs/mapped-types';
import { CreateAuditingDto } from './create-auditing.dto';

export class UpdateAuditingDto extends PartialType(CreateAuditingDto) {}
