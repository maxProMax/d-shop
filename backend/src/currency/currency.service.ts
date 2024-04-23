/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency) private currencyRepo: Repository<Currency>,
  ) {
    this.seedDb();
  }

  getCurrencySymbol(locale: string, currency: string) {
    return (0)
      .toLocaleString(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, '')
      .trim();
  }

  async seedDb() {
    const currencies = await this.currencyRepo.find();

    if (!currencies.length) {
      const c = new Currency();

      c.code = 'UAH';
      c.symbol = this.getCurrencySymbol('uk-UA', 'UAH');

      await this.currencyRepo.save(c);

      const c2 = new Currency();

      c2.code = 'EUR';
      c2.symbol = this.getCurrencySymbol('de-DE', 'EUR');

      await this.currencyRepo.save(c2);
    }
  }

  findAll() {
    return this.currencyRepo.find();
  }

  findOne(id: string) {
    return this.currencyRepo.findOneBy({ id });
  }
}
