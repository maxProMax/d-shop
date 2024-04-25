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
  UseInterceptors,
  UploadedFile,
  // Query,
  // Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminSessionGuard } from '@/users/admin/guards';
// import { getShopIdH } from '@/utils';
import { ProductService } from './product.service';
import { PriceDto, ProductCreateDto } from './types';
import { STATIC_ROOT_DIR } from '@/constants';

@Controller('product/')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('/')
  getProducts() {
    return this.service.findAll();
  }

  @Get('/:id')
  getProduct(@Param() params: { id: string }) {
    return this.service.findOne(params.id);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', { dest: `./${STATIC_ROOT_DIR}/product` }),
  )
  @UseGuards(AdminSessionGuard)
  createProduct(
    @Body() body: ProductCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file);
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', { dest: `./${STATIC_ROOT_DIR}/product` }),
  )
  @UseGuards(AdminSessionGuard)
  updateProduct(
    @Param() params: { id: string },
    @Body() body: ProductCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(params.id, body, file);
  }

  @Post('/:id')
  @UseGuards(AdminSessionGuard)
  createProductPrice(@Param() params: { id: string }, @Body() body: PriceDto) {
    return this.service.createPrice(params.id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminSessionGuard)
  deleteProduct(@Param() params: { id: string }) {
    return this.service.delete(params.id);
  }
}
