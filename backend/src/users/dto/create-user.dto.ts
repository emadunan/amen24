import { IsBoolean, IsDefined, IsEmail, IsString } from "class-validator";


export class CreateUserDto {
  @IsString()
  password: string;

  @IsString()
  @IsDefined()
  provider: string;

  @IsString()
  @IsDefined()
  providerId: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  displayName: string;

  @IsString()
  photoUri: string;

  @IsBoolean()
  isActive: boolean;
}
