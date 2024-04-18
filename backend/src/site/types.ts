import { IsString, IsEmail } from 'class-validator';

export class SiteCreateDto {
  @IsString()
  siteName: string;
}
