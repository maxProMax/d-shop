/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserSessionGuard } from '@/users/customer/guards';
import { SessionType } from '@/session/types';
import { getShopIdH } from '@/utils';
import { CartService } from './cart.service';
import { CartDto } from './types';

@Controller('/cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get('/')
  @UseGuards(UserSessionGuard)
  getCart(@Request() req: SessionType, @Headers() headers) {
    const shopId = getShopIdH(headers);

    if (req.session.passport.user.type === 'guest') {
      return this.service.getGuestCart(shopId, req.session.passport.user.id);
    }

    throw new Error('not supported');
  }

  @Put('/')
  @UseGuards(UserSessionGuard)
  addProduct(
    @Body() body: CartDto,
    @Request() req: SessionType,
    @Headers() headers,
  ) {
    const shopId = getShopIdH(headers);

    return this.service.addProduct({
      id: req.session.passport.user.id,
      shopId,
      productDto: body,
    });
  }

  @Get('/ping')
  ping() {
    return this.service.ping();
  }
}
