import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Lang, ThemeMode } from '@amen24/shared';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsEnum(Lang)
  uiLang: Lang | null;

  @IsEnum(ThemeMode)
  themeMode: ThemeMode;

  @IsString()
  refreshToken?: string;
}
