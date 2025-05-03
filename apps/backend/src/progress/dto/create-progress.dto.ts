import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateProgressDto {
  @IsString()
  title: string;

  @IsEmail()
  profileEmail: string;

  @IsNumber()
  verseId: number;
}
