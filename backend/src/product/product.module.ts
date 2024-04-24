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
import { ProductStorefrontController } from './product.storefront.controller';
import { ProductStorefrontService } from './product.storefront.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Price, Site, Currency]),
    CurrencyModule,
    SiteModule,
  ],
  controllers: [ProductController, ProductStorefrontController],
  providers: [ProductService, ProductStorefrontService],
  exports: [ProductService, ProductStorefrontService],
})
export class ProductModule {}
