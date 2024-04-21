import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { Product } from '../product/product.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { Image } from '@/image/image.entity';

import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    ImageModule,
    RedisModule,
    TypeOrmModule.forFeature([Category, Product, Image]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
