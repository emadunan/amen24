import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { AuthProvider, DateCalendar, Lang, ThemeMode, UserPrivilege } from '@amen24/shared';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsOptional()
  provider: AuthProvider;

  @IsOptional()
  privilege: UserPrivilege;

  @IsEnum(ThemeMode)
  themeMode: ThemeMode;

  @IsOptional()
  @IsEnum(Lang)
  uiLang: Lang | null;

  @IsOptional()
  @IsEnum(DateCalendar)
  dateCalendar: DateCalendar;

  @IsString()
  refreshToken?: string;
}
