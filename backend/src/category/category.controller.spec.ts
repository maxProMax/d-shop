import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { Product } from '@/product/product.entity';
import { Image } from '@/image/image.entity';
import { ImageService } from '@/image/image.service';
import { ProductStorefrontService } from '@/product/product.storefront.service';
import { SiteService } from '@/site/site.service';
import { Site } from '@/site/site.entity';

const mockCategories = [
  {
    id: '1',
    name: 'name1',
    description: 'description1',
    url: 'url1',
  },
  {
    id: '2',
    name: 'name2',
    description: 'description2',
    url: 'url2',
  },
];

describe('CategoryController', () => {
  // let usersAdminService: UsersAdminService;
  let categoryController: CategoryController;
  let newCategory: Category;

  beforeEach(async () => {
    newCategory = undefined;

    const moduleRef = await Test.createTestingModule({
      providers: [
        CategoryService,
        ImageService,
        ProductStorefrontService,
        SiteService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find({ where: { url } }) {
              return url
                ? mockCategories.filter((c) => c.url === url)
                : mockCategories;
            },
            findOne({ where: { id } }) {
              return mockCategories.find((c) => c.id === id);
            },
            save(d) {
              newCategory = { id: '3', ...d };

              return { id: newCategory.id };
            },
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Site),
          useValue: {},
        },
      ],
      controllers: [CategoryController],
    }).compile();

    // usersAdminService = moduleRef.get<UsersAdminService>(UsersAdminService);
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  it('getCategories, no query params', async () => {
    expect(await categoryController.getCategories({})).toEqual(mockCategories);
  });

  it('getCategories, with query params', async () => {
    expect(await categoryController.getCategories({ url: 'url1' })).toEqual(
      mockCategories.filter((c) => c.url === 'url1'),
    );
  });

  it('getCategory', async () => {
    expect(await categoryController.getCategory({ id: '1' })).toEqual(
      mockCategories.find((c) => c.id === '1'),
    );
  });

  it('createCategory', async () => {
    expect(
      await categoryController.createCategory(
        { name: 'name', description: 'description', url: 'url' },
        null,
      ),
    ).toEqual({ id: newCategory.id });
  });
});
