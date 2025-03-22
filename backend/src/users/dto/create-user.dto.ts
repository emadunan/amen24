import { AuthProvider, Lang } from '@amen24/shared';
import {
  IsBoolean,
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

  @ValidateIf((auth) => auth.provider === AuthProvider.LOCAL)
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsString()
  displayName: string;
  
  @IsString()
  uiLang: Lang;

  @IsString()
  @IsOptional()
  photoUri?: string;


  @IsObject()
  bookmark: {
    last_read: string,
    old_testament: string,
    new_testament: string,
  }
}
