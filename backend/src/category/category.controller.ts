import {
  Controller,
  Post,
  Body,
  // UseGuards,
  Get,
  // Request,
  Put,
  Param,
  // Res,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  // StreamableFile,
  // Response,
  // Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { AddProductDto, CategoryCreateDto } from './types';
// import { createReadStream } from 'fs';
// import { join } from 'path';

@Controller('category/')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/')
  getCategories(@Query() query: { url?: string }) {
    return this.service.findAll(query);
  }

  @Get('/trees')
  getCategoryTrees() {
    return this.service.findAllTrees();
  }

  @Get('/search')
  async getCategoryByUrl(@Query() query: { url?: string }) {
    return this.service.findByParams(query);
  }

  @Get('/:id')
  async getCategory(@Param() params: { id: string }) {
    return this.service.findById(params.id);
  }

  @Get('/:id/tree')
  async getCategoryTree(@Param() params: { id: string }) {
    return this.service.findDescendantsTree(params.id);
  }

  @Post('/')
  createCategory(@Body() body: CategoryCreateDto) {
    return this.service.create(body);
  }

  @Post('/:id/sub-category')
  createSubcategory(
    @Param() params: { id: string },
    @Body() body: CategoryCreateDto,
  ) {
    return this.service.createSubcategory(params.id, body);
  }

  @Put('/:id')
  updateCategory(
    @Param() params: { id: string },
    @Body() body: CategoryCreateDto,
  ) {
    return this.service.update(params.id, body);
  }

  @Delete('/:id')
  deleteCategory(@Param() params: { id: string }) {
    return this.service.delete(params.id);
  }

  @Put('/:id/product')
  addProduct(@Param() params: { id: string }, @Body() body: AddProductDto) {
    return this.service.addProduct(params.id, body);
  }

  @Delete('/:id/product/:product_id')
  deleteProduct(@Param() params: { id: string; product_id: string }) {
    return this.service.deleteProduct(params);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads/category' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
