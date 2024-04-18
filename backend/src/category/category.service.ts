/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';
import { AddProductDto, CategoryCreateDto } from './types';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepo.find();

    return categories;
  }

  async findById(id: string): Promise<Category> {
    return this.categoryRepo.findOneBy({ id });
  }

  async create(categoryDto: CategoryCreateDto): Promise<string> {
    const category = new Category();
    const { id } = await this.categoryRepo.save(
      Object.assign(category, categoryDto),
    );

    return id;
  }

  async addSubcategory(
    parentId: string,
    categoryDto: CategoryCreateDto,
  ): Promise<string> {
    const parentCategory = await this.categoryRepo.findOneBy({ id: parentId });
    const subCategory = new Category();

    await this.categoryRepo.save(
      Object.assign(subCategory, { ...categoryDto, parent: parentCategory }),
    );

    // const { id } = await this.categoryRepo.save(
    //   Object.assign(parentCategory, {
    //     ...categoryDto,
    //     parentId: 'c362e7ec',
    //   }),
    // );

    return parentId;
  }

  async update(id: string, categoryDto: CategoryCreateDto): Promise<string> {
    const category = await this.categoryRepo.findOneBy({ id });

    await this.categoryRepo.save(Object.assign(category, categoryDto));

    return id;
  }

  async delete(id: string): Promise<{ isOk: boolean }> {
    await this.categoryRepo.delete({ id });

    return { isOk: true };
  }

  async addProduct(id: string, addProductDto: AddProductDto): Promise<string> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    });
    const product = await this.productRepo.findOneBy({
      id: addProductDto.product_id,
    });
    category.products = [
      ...category.products.filter((p) => p.id !== product.id),
      product,
    ];

    await this.categoryRepo.manager.save(category);

    return id;
  }
}
