import { IsOptional, IsString } from 'class-validator';

export class CreateAuditingDto {
  @IsString()
  action: string;

  @IsString()
  performedBy: string;

  @IsOptional()
  metadata?: string;
}
