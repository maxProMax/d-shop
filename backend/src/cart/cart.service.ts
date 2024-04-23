/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '@/redis/redis.service';
import { SiteService } from '@/site/site.service';
import { ProductService } from '@/product/product.service';
import { SESSION_TTL } from '@/constants';
import { Cart, CartDto } from './types';

type CartType = Record<string, CartDto & { id?: string }>;

@Injectable()
export class CartService {
  constructor(
    private readonly redis: RedisService,
    private readonly productsService: ProductService,
    private readonly siteService: SiteService,
  ) {}

  ping() {
    return this.redis.ping();
  }

  private async getCart(id: string) {
    const cart = await this.redis.get(id);

    try {
      return JSON.parse(cart) as CartType;
    } catch {
      return null;
    }
  }

  private async createCart(id: string, cart: Partial<CartDto>) {
    await this.redis.set(id, JSON.stringify(cart));
    await this.redis.expire(id, SESSION_TTL); // seconds
  }

  private async getCartWithData(shopId: string, cart: CartType): Promise<Cart> {
    if (!shopId) {
      throw new NotFoundException('shop not found');
    }

    const { currency } = await this.siteService.findOne(shopId);

    if (!currency) {
      throw new NotFoundException('currency not found');
    }

    const products = await this.productsService.findByIds(
      shopId,
      Object.keys(cart),
    );

    return {
      currency,
      items: products.map((product) => ({
        id: cart[product.id].id,
        amount: cart[product.id].amount,
        product,
      })),
      get total() {
        return (this as Cart).items.reduce((memo, p) => {
          const productPrice = p.product.price;
          return (
            memo + (productPrice.discountPrice || productPrice.price) * p.amount
          );
        }, 0);
      },
    };
  }

  async createGuestCart(id?: string) {
    await this.createCart(id, {});

    return { done: true };
  }

  async getGuestCart(shopId: string, id?: string) {
    const cart = await this.getCart(id);

    if (!cart) {
      throw new NotFoundException('cart not found');
    }

    return this.getCartWithData(shopId, cart);
  }

  async addProduct({
    id,
    productDto,
    shopId,
  }: {
    id: string;
    productDto: CartDto;
    shopId: string;
  }) {
    const cart = await this.getCart(id);

    if (!cart) {
      throw new NotFoundException('cart not found');
    }

    const isExists = await this.productsService.findById(productDto.product_id);

    if (!isExists) {
      throw new NotFoundException('product not found');
    }

    const product = cart[productDto.product_id];

    if (!product) {
      cart[productDto.product_id] = {
        id: uuidv4(),
        amount: 1,
        ...productDto,
      };

      await this.createCart(id, cart);
    }

    return this.getCartWithData(shopId, cart);
  }
}
