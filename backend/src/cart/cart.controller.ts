/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { UserSessionGuard } from '@/users/customer/guards';
import { CartService } from './cart.service';
import { AddProductDto } from './types';

type Session = {
  session: { passport: { user: { id: string; type?: 'guest' | 'user' } } };
};

@Controller('/cart')
export class CartController {
  constructor(private readonly service: CartService) {}

  @Get('/')
  @UseGuards(UserSessionGuard)
  getCategories(@Request() req: Session) {
    if (req.session.passport.user.type === 'guest') {
      return this.service.getGuest(req.session.passport.user.id);
    }

    throw new Error('not supported');
  }

  @Put('/')
  addProduct(@Body() body: AddProductDto, @Request() req: Session) {
    return this.service.addProduct(req.session.passport.user.id, body);
  }
}
