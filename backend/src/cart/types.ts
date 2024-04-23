import { Currency } from '@/currency/currency.entity';
import { Price } from '@/product/price/price.entity';
import { Product } from '@/product/product.entity';
import { IsString, IsOptional } from 'class-validator';

export class CartDto {
  @IsString()
  product_id: string;

  @IsString()
  @IsOptional()
  amount: number;
}

export interface Cart {
  currency: Currency;
  total: number;
  items: {
    id: string;
    product: Omit<Product, 'prices'> & { price: Price };
    amount: number;
  }[];
}
