/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '@/cart/cart.service';
import { Injectable } from '@nestjs/common';
import { Order } from './order/order.entity';
import { OrderDetails } from './order/order-details.entry';
import { CurrencyService } from '@/currency/currency.service';
import { ProductService } from '@/product/product.service';
import { getPropertyNameOf } from '@/utils';
import { AddressDto } from '@/user/address/types';
import { AddressService } from '@/user/address/address.service';
import { EmailService } from '@/email/email.service';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,

    private readonly cartService: CartService,
    private readonly currencyService: CurrencyService,
    private readonly productService: ProductService,
    private readonly addressService: AddressService,
    private readonly mailerService: EmailService,
  ) {}

  /**
   * @deprecated
   */
  async checkout(shopId: string, userId: string) {
    const cart = await this.cartService.getGuestCart(shopId, userId);
    const currency = await this.currencyService.findOne(cart.currency.id);

    const order = await this.orderRepo.save(
      Object.assign(new Order(), { currency }),
    );

    await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productService.findOne(item.product.id);
        const orderDetailsModel = new OrderDetails();

        orderDetailsModel.order = order;
        orderDetailsModel.currency = currency;
        orderDetailsModel.product = product;
        orderDetailsModel.amount = item.amount;
        orderDetailsModel.price =
          item.amount *
          (item.product.price.discountPrice || item.product.price.price);

        await this.orderDetailsRepo.save(orderDetailsModel);
      }),
    );

    const orders: { total: number } = await this.orderDetailsRepo
      .createQueryBuilder('orderDetails')
      .select([
        `SUM(orderDetails.${getPropertyNameOf<OrderDetails>('price')}) AS total`,
      ])
      .groupBy(`orderDetails.${getPropertyNameOf<OrderDetails>('order')}`)
      .getRawOne();

    order.total = Number(orders.total);

    await this.orderRepo.save(order);
    await this.cartService.clearCart(userId);

    return { orderId: order.id };
  }

  async checkoutGuest(shopId: string, userId: string, addressDto: AddressDto) {
    const cart = await this.cartService.getGuestCart(shopId, userId);
    const currency = await this.currencyService.findOne(cart.currency.id);
    const address = await this.addressService.create(addressDto);

    const order = await this.orderRepo.save(
      Object.assign(new Order(), { currency, address }),
    );

    await Promise.all(
      cart.items.map(async (item) => {
        const product = await this.productService.findOne(item.product.id);
        const orderDetailsModel = new OrderDetails();

        orderDetailsModel.order = order;
        orderDetailsModel.currency = currency;
        orderDetailsModel.product = product;
        orderDetailsModel.amount = item.amount;
        orderDetailsModel.price =
          item.amount *
          (item.product.price.discountPrice || item.product.price.price);

        await this.orderDetailsRepo.save(orderDetailsModel);
      }),
    );

    const orders: { total: number } = await this.orderDetailsRepo
      .createQueryBuilder('orderDetails')
      .select([
        `SUM(orderDetails.${getPropertyNameOf<OrderDetails>('price')}) AS total`,
      ])
      .groupBy(`orderDetails.${getPropertyNameOf<OrderDetails>('order')}`)
      .having(
        `orderDetails.${getPropertyNameOf<OrderDetails>('order')} = :id`,
        {
          id: order.id,
        },
      )
      .getRawOne();

    order.total = Number(orders.total);

    await this.orderRepo.save(order);
    await this.cartService.clearCart(userId);

    await this.mailerService.checkout({
      to: address.email,
      context: {
        products: cart.items.map((i) => ({
          name: i.product.name,
          price: `${i.product.price.price} ${i.product.price.currency.symbol}`,
        })),
        total: `${cart?.total} ${cart.currency.symbol}`,
        orderId: order.id,
      },
    });

    return { orderId: order.id };
  }

  async getAllOrders() {
    return this.orderRepo.find({
      relations: { currency: true, orderDetails: true, address: true },
      order: { createdDate: 'DESC' },
    });
  }

  getOrder(id: string) {
    return this.orderRepo.findOne({
      where: { id },
      relations: {
        currency: true,
        orderDetails: { product: true, currency: true },
        address: true,
      },
    });
  }

  async updateAddress(id: string, addressDto: AddressDto) {
    const address = await this.addressService.create(addressDto);
    const order = await this.orderRepo.findOneBy({ id });

    order.address = address;

    await this.orderRepo.save(order);

    return { id };
  }
}
