import { RedisModule } from '@/redis/redis.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [RedisModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
