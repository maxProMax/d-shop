/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  UseGuards,
  Request,
  Headers,
  Param,
} from '@nestjs/common';
import { UserSessionGuard } from '@/users/customer/guards';
import { AdminSessionGuard } from '@/users/admin/guards';
import { getShopIdH } from '@/utils';
import { SessionType } from '@/session/types';
import { CheckoutService } from './checkout.service';

@Controller('/checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Get('/')
  @UseGuards(UserSessionGuard)
  checkout(@Request() req: SessionType, @Headers() headers) {
    const shopId = getShopIdH(headers);

    if (req.session.passport.user.type === 'guest') {
      return this.service.checkout(shopId, req.session.passport.user.id);
    }

    throw new Error('not supported');
  }

  @Get('/all-orders')
  @UseGuards(AdminSessionGuard)
  getAllOrders() {
    return this.service.getAllOrders();
  }

  @Get('/order/:id')
  @UseGuards(AdminSessionGuard)
  getOrder(@Param() params: { id: string }) {
    return this.service.getOrder(params.id);
  }
}
