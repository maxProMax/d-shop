/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CurrencyService } from '@/currency/currency.service';
import { Product } from './product.entity';
import { PriceDto, ProductCreateDto } from './types';
import { Price } from './price/price.entity';
import { ImageService } from '@/image/image.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly currencyService: CurrencyService,
    private readonly imageService: ImageService,
  ) {}

  async findAll() {
    return this.productRepo.find({
      relations: { prices: { currency: true }, image: true },
    });
  }

  async findOne(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: { prices: { currency: true }, image: true },
    });
  }

  // async findById(id: string) {
  //   return this.productRepo.findOne({
  //     where: { id },
  //     relations: { prices: { currency: true } },
  //   });
  // }

  // async findByParams(shopId: string, query: { url?: string }) {
  //   const site = await this.siteService.findOne(shopId);

  //   const products = await this.productRepo.find({
  //     relations: { prices: { currency: true } },
  //     where: { url: query.url, prices: { currency: { id: site.currency.id } } },
  //   });

  //   return this.flatProductPrices(products);
  // }

  // async findByIds(shopId: string, ids: string[]) {
  //   const site = await this.siteService.findOne(shopId);

  //   const products = await this.productRepo.find({
  //     relations: { prices: { currency: true } },
  //     where: {
  //       id: In(ids),
  //       prices: { currency: { id: site.currency.id } },
  //     },
  //   });

  //   return this.flatProductPrices(products);
  // }

  // flatProductPrices(products: Product[]) {
  //   return products.map(({ prices = [], ...rest }) => ({
  //     ...rest,
  //     price: prices[0],
  //   }));
  // }

  async create(productDto: ProductCreateDto, file: Express.Multer.File) {
    const product = new Product();

    if (file) {
      const image = await this.imageService.create(file);
      product.image = image;
    }

    const { id } = await this.productRepo.save(
      Object.assign(product, productDto),
    );

    return { id };
  }

  async createPrice(id: string, priceDto: PriceDto) {
    const product = await this.findOne(id);
    const currency = await this.currencyService.findOne(priceDto.currency);

    if (!currency) {
      throw new NotFoundException('currency not found');
    }

    const price =
      product.prices.find((p) => p.currency?.id === priceDto.currency) ||
      new Price();

    price.currency = currency;
    price.price = priceDto.price;
    price.discountPrice = priceDto.discountPrice;

    product.prices = product.prices.filter((p) => p !== price).concat([price]);

    await this.productRepo.save(product);

    return { id };
  }

  async update(
    id: string,
    productDto: ProductCreateDto,
    file: Express.Multer.File,
  ) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: { image: true },
    });

    if (file) {
      product.image = product.image
        ? await this.imageService.update(product.image.id, file)
        : await this.imageService.create(file);
    }

    await this.productRepo.save(Object.assign(product, productDto));

    return { id };
  }

  async delete(id: string): Promise<{ isOk: boolean }> {
    const product = await this.findOne(id);

    if (product.image) {
      await this.imageService.delete(product.image.id);
    } else {
      await this.productRepo.remove(product);
    }

    return { isOk: true };
  }

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
