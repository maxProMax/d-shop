import { IsString, IsNumber } from 'class-validator';

export class AddProductDto {
  @IsString()
  product_id: string;

  @IsNumber()
  amount: number;
}
