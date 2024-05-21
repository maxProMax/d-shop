import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { SHOP_ID_HEADER } from '@/constants';
import { Product } from '@/product/product.entity';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { Order } from './order/order.entity';
import { OrderDetails } from './order/order-details.entry';
import { CartService } from '@/cart/cart.service';
import { CurrencyService } from '@/currency/currency.service';
import { ProductService } from '@/product/product.service';
import { AddressService } from '@/user/address/address.service';
import { EmailService } from '@/email/email.service';
import { RedisService } from '@/redis/redis.service';
import { ProductStorefrontService } from '@/product/product.storefront.service';
import { SiteService } from '@/site/site.service';
import { Currency } from '@/currency/currency.entity';
import { Image } from '@/image/image.entity';
import { ImageService } from '@/image/image.service';
import { Address } from '@/user/address/address.entity';
import { MAILER_OPTIONS, MailerService } from '@nestjs-modules/mailer';
import { REDIS_OPTIONS } from '@/redis/constants';
import { Site } from '@/site/site.entity';

const mockCurrency = [{ id: '1', code: 'UAH', symbol: '₴' }];
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
        currency: mockCurrency[0],
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
const mockSites = [
  {
    id: '1',
    siteName: 'siteName',
    logo: {
      id: '1',
      originalname: 'originalname',
      mimetype: 'image/png',
      originalPath: 'originalPath',
      path: 'path',
      size: 43103,
    },
    navigation: {
      id: '1',
      name: 'name',
      description: 'description',
      url: 'url',
    },
    currency: mockCurrency[0],
  },
];

describe('CategoryController', () => {
  let checkoutController: CheckoutController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CheckoutService,
          useClass: class extends CheckoutService {
            getOrderTotal() {
              return Promise.resolve({ total: '100' });
            }
          },
        },
        CartService,
        CurrencyService,
        ProductService,
        AddressService,
        EmailService,
        {
          provide: ProductStorefrontService,
          useClass: class extends ProductStorefrontService {
            productQueryWithSite(): any {
              return mockProducts;
            }
          },
        },
        SiteService,
        ImageService,
        { provide: MailerService, useValue: { checkout() {}, sendMail() {} } },
        {
          provide: RedisService,
          useValue: {
            get: () => '{"1":{"id":"1","amount":100,"product_id":"1"}}',
            set: () => {},
            expire: () => {},
          },
        },
        {
          provide: REDIS_OPTIONS,
          useValue: {},
        },
        {
          provide: MAILER_OPTIONS,
          useValue: { transport: { url: '' } },
        },
        {
          provide: getRepositoryToken(Order),
          useValue: {
            save: () => ({ id: '1' }),
          },
        },
        {
          provide: getRepositoryToken(OrderDetails),
          useValue: {
            save() {},
          },
        },
        {
          provide: getRepositoryToken(Currency),
          useValue: {
            find: () => mockCurrency,
            findOneBy: () => mockCurrency[0],
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOne: () => mockProducts[0],
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            save: () => ({}),
          },
        },
        {
          provide: getRepositoryToken(Site),
          useValue: {
            findOne: () => mockSites[0],
          },
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {},
        },
      ],
      controllers: [CheckoutController],
    }).compile();

    checkoutController = moduleRef.get<CheckoutController>(CheckoutController);
  });

  it('getProducts', async () => {
    expect(
      await checkoutController.checkoutGuest(
        { session: { passport: { user: { id: '1' } } } } as any,
        { [SHOP_ID_HEADER]: '1' },
        {
          phone: '+38045444331',
          address: 'address',
          country: 'country',
          email: 'email@email.com',
        },
      ),
    ).toEqual({ orderId: '1' });
  });
});
