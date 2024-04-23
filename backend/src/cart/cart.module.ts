import { Module } from '@nestjs/common';
import { SiteModule } from '@/site/site.module';
import { RedisModule } from '@/redis/redis.module';
import { ProductModule } from '@/product/product.module';
import { REDIS_HOST, REDIS_PORT, REDIS_CART_DB_IDX } from '@/constants';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    RedisModule.register({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      db: Number(REDIS_CART_DB_IDX),
    }),
    ProductModule,
    SiteModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
