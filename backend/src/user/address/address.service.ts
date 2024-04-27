/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressDto } from './types';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private repository: Repository<Address>,
  ) {}

  async create(body: AddressDto) {
    return await this.repository.save(Object.assign(new Address(), body));
  }

  async update(id: string, body: AddressDto) {
    const address = await this.repository.findOneBy({ id });

    await this.repository.save(Object.assign(address, body));

    return { id };
  }
}
