import { IsString, IsOptional } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  url: string;
}

export class AddProductDto {
  @IsString()
  product_id: string;
}
