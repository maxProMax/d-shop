import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  url: string;
}

export class PriceDto {
  @IsString()
  currency: string;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  discountPrice: number;
}
