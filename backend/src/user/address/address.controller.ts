/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AddressDto } from './types';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Post('/')
  async createAddress(@Body() body: AddressDto) {
    return this.service.create(body);
  }

  @Put('/:id')
  async updateAddress(
    @Param() params: { id: string },
    @Body() body: AddressDto,
  ) {
    return this.service.update(params.id, body);
  }
}
