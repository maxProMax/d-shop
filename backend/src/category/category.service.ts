/*
https://docs.nestjs.com/providers#services
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { Product } from '../product/product.entity';
import { AddProductDto, CategoryCreateDto } from './types';
import { ImageService } from '@/image/image.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly imageService: ImageService,
  ) {}

  async findAll(query: { url?: string }): Promise<Category[]> {
    const categories = await this.categoryRepo.find({
      where: query ? query : {},
    });

    return categories;
  }

  async findAllTrees(): Promise<Category[]> {
    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findTrees();

    return categories;
  }

  async findById(id: string): Promise<Category> {
    return await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true, banner: true },
    });
  }

  async findByParams(query: { url?: string }): Promise<Category[]> {
    return await this.categoryRepo.find({
      where: query ? query : {},
      relations: { products: true, banner: true },
    });
  }

  async findDescendantsTree(id: string) {
    const parent = await this.findById(id);

    return await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findDescendantsTree(parent);
  }

  async getCategoryTree(id: string): Promise<Category> {
    const parentCategory = await this.categoryRepo.findOneBy({ id });
    const categories = await this.categoryRepo.manager
      .getTreeRepository(Category)
      .findDescendantsTree(parentCategory, { relations: ['banner'] });

    return categories;
  }

  async create(categoryDto: CategoryCreateDto, file?: Express.Multer.File) {
    const category = new Category();

    if (file) {
      category.banner = this.imageService.create(file);
    }

    const { id } = await this.categoryRepo.save(
      Object.assign(category, categoryDto),
    );

    return { id };
  }

  async createSubcategory(
    parentId: string,
    categoryDto: CategoryCreateDto,
    file?: Express.Multer.File,
  ) {
    const parentCategory = await this.categoryRepo.findOneBy({ id: parentId });
    const subCategory = new Category();

    if (file) {
      subCategory.banner = this.imageService.create(file);
    }

    const { id } = await this.categoryRepo.save(
      Object.assign(subCategory, { ...categoryDto, parent: parentCategory }),
    );

    return { id };
  }

  async update(
    id: string,
    categoryDto: CategoryCreateDto,
    file?: Express.Multer.File,
  ) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { banner: true },
    });

    if (file) {
      category.banner = category.banner
        ? await this.imageService.update(category.banner.id, file)
        : await this.imageService.create(file);
    }

    await this.categoryRepo.save(Object.assign(category, categoryDto));

    return { id };
  }

  async delete(id: string): Promise<{ isOk: boolean }> {
    const tree = await this.getCategoryTree(id);

    const recursion = async (c: Category) => {
      if (c.children?.length) {
        await Promise.all(c.children.map(recursion));
      }

      if (c.banner) {
        await this.imageService.delete(c.banner.id);
      } else {
        await this.categoryRepo.remove(c);
      }
    };

    await recursion(tree);

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
