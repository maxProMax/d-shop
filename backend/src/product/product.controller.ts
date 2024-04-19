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
} from '@nestjs/common';
import { AdminSessionGuard } from '@/users/admin/guards';
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
  @UseGuards(AdminSessionGuard)
  createProduct(@Body() body: ProductCreateDto) {
    return this.service.create(body);
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
