import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;

  @IsEmail()
  profileEmail: string;

  @IsNumber()
  verseId: number;
}
