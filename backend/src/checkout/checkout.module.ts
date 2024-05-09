import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CartModule } from '@/cart/cart.module';
import { Order } from './order/order.entity';
import { OrderDetails } from './order/order-details.entry';
import { CurrencyModule } from '@/currency/currency.module';
import { ProductModule } from '@/product/product.module';
import { AddressModule } from '@/user/address/address.module';
import { EmailModule } from '@/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails]),
    CartModule,
    CurrencyModule,
    ProductModule,
    AddressModule,
    EmailModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
