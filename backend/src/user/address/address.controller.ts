/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AddressDto } from './types';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post('/')
  async createAddress(@Body() body: AddressDto) {
    // return this.service.registration(body);
    return this.service.create(body);
  }
}
