/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { RedisService } from '@/redis/redis.service';
import { AddProductDto } from './types';

// const r = await this.redis.ping();

// console.log('redis', { r });

@Injectable()
export class CartService {
  constructor(private readonly redis: RedisService) {}

  ping() {
    return this.redis.ping();
  }

  async getGuest(id?: string) {
    const cart = await this.redis.hget('cart', id);
    console.log({ cart });

    if (!cart) {
      await this.redis.hset('cart', id, JSON.stringify({}));

      return {};
    } else {
      return cart;
    }

    // await redis.set("foo", "bar");
    // await redis.expire("foo", 10); // 10 seconds
    // console.log(await redis.ttl("foo")); // a number smaller or equal to 10
  }

  async addProduct(id: string, productDto: AddProductDto) {
    const resp = await this.redis.hget('cart', id);
    const products = JSON.parse(resp);
    console.log(products);

    const product = products[productDto.product_id];

    if (!product) {
      products[productDto.product_id] = product;
      await this.redis.hset('cart', id, JSON.stringify(products));
    }
  }
}
