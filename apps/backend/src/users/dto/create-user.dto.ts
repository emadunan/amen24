import { AuthProvider, Lang } from '@amen24/shared';
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  provider: AuthProvider;

  @IsString()
  @IsOptional()
  providerId: string;

  @IsEmail()
  email: string;

  @IsString()
  @ValidateIf((auth) => auth.provider === AuthProvider.LOCAL)
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  @IsOptional()
  password?: string;

  @IsString()
  displayName: string;

  @IsString()
  uiLang: Lang | null;

  @IsString()
  @IsOptional()
  photoUri?: string;

  @IsObject()
  bookmark: {
    last_read: string;
    old_testament?: string;
    new_testament?: string;
  };
}
