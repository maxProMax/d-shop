import { IsString, IsOptional } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  url: string;
}
