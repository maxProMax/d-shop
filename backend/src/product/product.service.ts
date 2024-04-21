/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductCreateDto } from './types';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private service: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.service.find();
  }

  async findById(id: string): Promise<Product> {
    return this.service.findOneBy({ id });
  }

  async findByParams(query: { url?: string }) {
    return this.service.findBy(query);
  }

  async create(productDto: ProductCreateDto) {
    const product = new Product();

    const { id } = await this.service.save(Object.assign(product, productDto));

    return { id };
  }

  async update(id: string, productDto: ProductCreateDto) {
    const product = await this.service.findOneBy({ id });

    await this.service.save(Object.assign(product, productDto));

    return { id };
  }

  async delete(id: string): Promise<{ isOk: boolean }> {
    await this.service.delete({ id });

    return { isOk: true };
  }
}
