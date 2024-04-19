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
  getCategories() {
    return this.service.findAll();
  }

  @Get('/:id')
  async getCategory(@Param() params: { id: string }) {
    return this.service.findById(params.id);
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads/category' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
