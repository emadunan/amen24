import { IsOptional, IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsString()
  target: string;
}
