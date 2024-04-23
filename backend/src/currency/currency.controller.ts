/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('/currency')
export class CurrencyController {
  constructor(protected service: CurrencyService) {}

  @Get('/')
  getCategories() {
    return this.service.findAll();
  }
}
