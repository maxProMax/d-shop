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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './types';

@Controller('product/')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/')
  getProducts() {
    return this.service.findAll();
  }

  @Get('/:id')
  getProduct(@Param() params: { id: string }) {
    return this.service.findById(params.id);
  }

  @Post('/')
  createProduct(@Body() body: ProductCreateDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  updateProduct(
    @Param() params: { id: string },
    @Body() body: ProductCreateDto,
  ) {
    return this.service.update(params.id, body);
  }

  @Delete('/:id')
  deleteProduct(@Param() params: { id: string }) {
    return this.service.delete(params.id);
  }
}
