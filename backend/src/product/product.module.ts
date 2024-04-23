import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CurrencyModule } from '@/currency/currency.module';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { Price } from './price/price.entity';
import { Site } from '@/site/site.entity';
import { Currency } from '@/currency/currency.entity';
import { SiteModule } from '@/site/site.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Price, Site, Currency]),
    CurrencyModule,
    SiteModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
