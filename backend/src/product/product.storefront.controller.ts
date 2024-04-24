/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  // Post,
  // Body,
  // UseGuards,
  Get,
  // Request,
  // Put,
  // Param,
  // Delete,
  // UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
// import { AdminSessionGuard } from '@/users/admin/guards';
import { getShopIdH } from '@/utils';
import { ProductStorefrontService } from './product.storefront.service';
// import { PriceDto, ProductCreateDto } from './types';

@Controller('product/storefront')
export class ProductStorefrontController {
  constructor(private readonly service: ProductStorefrontService) {}

  @Get('/search')
  async getProductByParams(
    @Query() query: { url?: string },
    @Headers() headers,
  ) {
    return this.service.findByParams(getShopIdH(headers), query);
  }
}
