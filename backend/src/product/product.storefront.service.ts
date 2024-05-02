/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Site } from '@/site/site.entity';
import { SiteService } from '@/site/site.service';
import { Price } from './price/price.entity';

@Injectable()
export class ProductStorefrontService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly siteService: SiteService,
  ) {}

  async findAll(shopId: string) {
    const site = await this.siteService.findOne(shopId);

    const products = await this.productRepo.find({
      where: { prices: { currency: { id: site.currency.id } } },
      relations: { prices: { currency: true }, image: true },
    });

    return this.flatProductPrices(products);
  }

  async findById(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: { prices: { currency: true } },
    });
  }

  async findByParams(shopId: string, query: { url?: string }) {
    const site = await this.siteService.findOne(shopId);

    const products = await this.productRepo.find({
      relations: { prices: { currency: true }, image: true },
      where: { url: query.url, prices: { currency: { id: site.currency.id } } },
    });

    return this.flatProductPrices(products);
  }

  private productQueryWithSite() {
    return this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect(`product.${Product.imageName}`, 'image') // relation
      .innerJoinAndSelect(`product.${Product.pricesName}`, 'price') // for select
      .leftJoinAndSelect(`price.${Price.currencyName}`, 'currency') // relation
      .innerJoin(Site, 'site', `site.currency = price.currency`); // for select
  }

  async findByIds(shopId: string, ids: string[]) {
    if (!ids.length) {
      return [];
    }

    const products = await this.productQueryWithSite()
      .where('site.id = :shopId', { shopId })
      .where('product.id IN (:...ids)', { ids })
      .getMany();

    return this.flatProductPrices(products);

    // const site = await this.siteService.findOne(shopId);

    // const products = await this.productRepo.find({
    //   relations: { prices: { currency: true }, image: true },
    //   where: {
    //     id: In(ids),
    //     prices: { currency: { id: site.currency.id } },
    //   },
    // });

    // return this.flatProductPrices(products);
  }

  private flatProductPrices(products: Product[]) {
    return products.map(({ prices = [], ...rest }) => ({
      ...rest,
      price: prices[0],
    }));
  }
}
