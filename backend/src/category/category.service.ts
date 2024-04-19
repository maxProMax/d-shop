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
    // const a1 = new Category();
    // a1.name = 'a1';
    // await this.categoryRepo.save(a1);

    // const a11 = new Category();
    // a11.name = 'a11';
    // a11.parent = a1;
    // await this.categoryRepo.save(a11);

    // const a12 = new Category();
    // a12.name = 'a12';
    // a12.parent = a1;
    // await this.categoryRepo.save(a12);

    // const a111 = new Category();
    // a111.name = 'a111';
    // a111.parent = a11;
    // await this.categoryRepo.save(a111);

    // const a112 = new Category();
    // a112.name = 'a112';
    // a112.parent = a11;
    // await this.categoryRepo.save(a112);

    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findTrees();
    // const trees = await dataSource.manager.getTreeRepository(Category).findTrees()
    return categories;
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    });
  }

  async getCategoryTree(id: string): Promise<Category> {
    const parentCategory = await this.categoryRepo.findOneBy({ id });
    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findDescendantsTree(parentCategory);

    return categories;
  }

  async create(categoryDto: CategoryCreateDto) {
    const category = new Category();
    const { id } = await this.categoryRepo.save(
      Object.assign(category, categoryDto),
    );

    return { id };
  }

  async createSubcategory(parentId: string, categoryDto: CategoryCreateDto) {
    const parentCategory = await this.categoryRepo.findOneBy({ id: parentId });
    const subCategory = new Category();

    const { id } = await this.categoryRepo.save(
      Object.assign(subCategory, { ...categoryDto, parent: parentCategory }),
    );

    return { id };
  }

  async update(id: string, categoryDto: CategoryCreateDto) {
    const category = await this.categoryRepo.findOneBy({ id });

    await this.categoryRepo.save(Object.assign(category, categoryDto));

    return { id };
  }

  async delete(id: string): Promise<{ isOk: boolean }> {
    await this.categoryRepo.delete({ id });

    return { isOk: true };
  }

  async addProduct(id: string, addProductDto: AddProductDto) {
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

    return { id };
  }

  async deleteProduct({ id, product_id }: { id: string; product_id: string }) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    });

    category.products = category.products.filter((p) => p.id !== product_id);

    await this.categoryRepo.manager.save(category);

    return { id };
  }
}
