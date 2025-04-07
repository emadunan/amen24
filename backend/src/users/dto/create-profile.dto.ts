import { IsEmail, IsEnum } from 'class-validator';
import { Lang } from '@amen24/shared';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsEnum(Lang)
  uiLang: Lang | null;
}
