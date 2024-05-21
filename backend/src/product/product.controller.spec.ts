import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Product } from '@/product/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CurrencyService } from '@/currency/currency.service';
import { ImageService } from '@/image/image.service';
import { Currency } from '@/currency/currency.entity';
import { Image } from '@/image/image.entity';

const mockProducts = [
  {
    id: '1',
    name: 'name1',
    url: 'url1',
    description: 'description1',
    prices: [
      {
        id: '1',
        price: 1,
        discountPrice: 0,
        currency: { id: '1', code: 'UAH', symbol: '₴' },
      },
    ],
    image: {
      id: '1',
      originalname: 'originalname',
      mimetype: 'image/webp',
      originalPath: 'originalPath',
      path: 'path',
      size: 1,
    },
  },
];

describe('CategoryController', () => {
  // let usersAdminService: UsersAdminService;
  let productController: ProductController;
  let newProduct: Product;

  beforeEach(async () => {
    newProduct = undefined;

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductService,
        CurrencyService,
        ImageService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find() {
              return mockProducts;
            },
            findOne({ where: { id } }) {
              return mockProducts.find((c) => c.id === id);
            },
            save(d) {
              newProduct = { id: '2', ...d };
              return { id: newProduct.id };
            },
          },
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Currency),
          useValue: {
            find() {
              return [];
            },
            save() {},
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    productController = moduleRef.get<ProductController>(ProductController);
  });

  it('getProducts', async () => {
    expect(await productController.getProducts()).toEqual(mockProducts);
  });

  it('getProduct', async () => {
    expect(await productController.getProduct({ id: '1' })).toEqual(
      mockProducts[0],
    );
  });

  it('createProduct', async () => {
    expect(
      await productController.createProduct(
        { name: 'name', url: 'url', description: 'description' },
        null,
      ),
    ).toEqual({ id: newProduct.id });
  });
});
