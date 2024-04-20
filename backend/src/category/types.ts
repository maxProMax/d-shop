import { IsString, IsOptional, IsArray } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;

  @IsString()
  url: string;
}

export class AddProductDto {
  @IsString()
  product_id: string;
}
