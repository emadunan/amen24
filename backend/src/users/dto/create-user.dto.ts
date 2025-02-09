import { IsBoolean, IsEmail, IsOptional, IsString, MinLength, ValidateIf } from "class-validator";


export class CreateUserDto {
  @IsString()
  provider: string;

  @IsString()
  @IsOptional()
  providerId: string;

  @IsEmail()
  email: string;

  @ValidateIf(o => o.provider === "local")
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password?: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  photoUri?: string;

  @IsBoolean()
  isActive: boolean;
}
