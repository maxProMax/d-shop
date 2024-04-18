import { IsString, IsEmail, IsArray } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;
}

export class AddProductDto {
  @IsString()
  product_id: string;
}
