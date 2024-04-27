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
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { UserSessionGuard } from '@/user/customer/guards';
import { AdminSessionGuard } from '@/user/admin/guards';
import { getShopIdH } from '@/utils';
import { SessionType } from '@/session/types';
import { CheckoutService } from './checkout.service';
import { AddressDto } from '@/user/address/types';

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

  @Post('/guest')
  @UseGuards(UserSessionGuard)
  checkoutGuest(
    @Request() req: SessionType,
    @Headers() headers,
    @Body() body: AddressDto,
  ) {
    const shopId = getShopIdH(headers);

    return this.service.checkoutGuest(
      shopId,
      req.session.passport.user.id,
      body,
    );
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

  @Put('/order/:id')
  @UseGuards(AdminSessionGuard)
  updateAddress(@Param() params: { id: string }, @Body() body: AddressDto) {
    return this.service.updateAddress(params.id, body);
  }
}
