/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  Injectable,
  // NotFoundException
} from '@nestjs/common';
import { CurrencyService } from '@/currency/currency.service';
import { Product } from './product.entity';
// import { PriceDto, ProductCreateDto } from './types';
// import { Price } from './price/price.entity';
import { Site } from '@/site/site.entity';
import { SiteService } from '@/site/site.service';

@Injectable()
export class ProductStorefrontService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Site) private siteRepo: Repository<Site>,
    private readonly currencyService: CurrencyService,
    private readonly siteService: SiteService,
  ) {}

  // async findAll() {
  //   return this.productRepo.find();
  // }

  // async findOne(id: string) {
  //   return this.productRepo.findOne({
  //     where: { id },
  //     relations: { prices: { currency: true } },
  //   });
  // }

  async findAll(shopId: string) {
    const site = await this.siteService.findOne(shopId);

    const products = await this.productRepo.find({
      where: { prices: { currency: { id: site.currency.id } } },
      relations: { prices: { currency: true }, image: true },
    });

    console.log(products);

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

  async findByIds(shopId: string, ids: string[]) {
    const site = await this.siteService.findOne(shopId);

    const products = await this.productRepo.find({
      relations: { prices: { currency: true }, image: true },
      where: {
        id: In(ids),
        prices: { currency: { id: site.currency.id } },
      },
    });

    return this.flatProductPrices(products);
  }

  private flatProductPrices(products: Product[]) {
    return products.map(({ prices = [], ...rest }) => ({
      ...rest,
      price: prices[0],
    }));
  }

  // async create(productDto: ProductCreateDto) {
  //   const product = new Product();

  //   const { id } = await this.productRepo.save(
  //     Object.assign(product, productDto),
  //   );

  //   return { id };
  // }

  // async createPrice(id: string, priceDto: PriceDto) {
  //   const product = await this.findOne(id);
  //   const currency = await this.currencyService.findOne(priceDto.currency);

  //   if (!currency) {
  //     throw new NotFoundException('currency not found');
  //   }

  //   const price =
  //     product.prices.find((p) => p.currency?.id === priceDto.currency) ||
  //     new Price();

  //   price.currency = currency;
  //   price.price = priceDto.price;
  //   price.discountPrice = priceDto.discountPrice;

  //   product.prices = product.prices.filter((p) => p !== price).concat([price]);

  //   await this.productRepo.save(product);

  //   return { id };
  // }

  // async update(id: string, productDto: ProductCreateDto) {
  //   const product = await this.productRepo.findOneBy({ id });

  //   await this.productRepo.save(Object.assign(product, productDto));

  //   return { id };
  // }

  // async delete(id: string): Promise<{ isOk: boolean }> {
  //   await this.productRepo.delete({ id });

  //   return { isOk: true };
  // }

  // async getProductsByIds(ids: string[]) {
  //   if (!ids.length) {
  //     return [];
  //   }

  //   return this.productRepo
  //     .createQueryBuilder('product')
  //     .leftJoinAndSelect('product.prices', 'prices')
  //     .leftJoinAndSelect('prices.currency', 'currency')
  //     .where('product.id IN (:ids)', { ids })
  //     .getMany();
  // }
}
