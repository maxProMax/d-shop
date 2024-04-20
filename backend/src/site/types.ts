import { IsString, IsOptional } from 'class-validator';

export class SiteCreateDto {
  @IsString()
  siteName: string;

  @IsOptional()
  @IsString()
  navigation?: string;
}
