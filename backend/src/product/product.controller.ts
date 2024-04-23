/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Post,
  Body,
  // UseGuards,
  Get,
  // Request,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Headers,
} from '@nestjs/common';
import { AdminSessionGuard } from '@/users/admin/guards';
import { getShopIdH } from '@/utils';
import { ProductService } from './product.service';
import { PriceDto, ProductCreateDto } from './types';

@Controller('product/')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/')
  getProducts() {
    return this.service.findAll();
  }

  @Get('/search')
  async getProductByParams(
    @Query() query: { url?: string },
    @Headers() headers,
  ) {
    return this.service.findByParams(getShopIdH(headers), query);
  }

  @Get('/:id')
  getProduct(@Param() params: { id: string }) {
    return this.service.findById(params.id);
  }

  @Post('/')
  @UseGuards(AdminSessionGuard)
  createProduct(@Body() body: ProductCreateDto) {
    return this.service.create(body);
  }

  @Post('/:id')
  @UseGuards(AdminSessionGuard)
  createProductPrice(@Param() params: { id: string }, @Body() body: PriceDto) {
    return this.service.createPrice(params.id, body);
  }

  @Put('/:id')
  @UseGuards(AdminSessionGuard)
  updateProduct(
    @Param() params: { id: string },
    @Body() body: ProductCreateDto,
  ) {
    return this.service.update(params.id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminSessionGuard)
  deleteProduct(@Param() params: { id: string }) {
    return this.service.delete(params.id);
  }
}
