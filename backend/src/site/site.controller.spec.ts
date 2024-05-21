import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { Image } from '../image/image.entity';
import { SiteController } from './site.controller';
import { Site } from './site.entity';
import { SiteService } from './site.service';
import { ImageService } from '@/image/image.service';

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
  },
];

describe('SiteController', () => {
  let siteController: SiteController;
  let newSite: Site;

  beforeEach(async () => {
    newSite = undefined;

    const moduleRef = await Test.createTestingModule({
      providers: [
        SiteService,
        ImageService,
        {
          provide: getRepositoryToken(Site),
          useValue: {
            findOne({ where: { id } }: { where: { id: string } }) {
              return mockSites.find((c) => c.id === id);
            },
            save(d) {
              newSite = { id: 2, ...d };
              return { id: newSite.id };
            },
            find() {
              return mockSites;
            },
          },
        },
        {
          provide: getRepositoryToken(Image),
          useValue: {},
        },
      ],
      controllers: [SiteController],
    }).compile();

    // usersAdminService = moduleRef.get<UsersAdminService>(UsersAdminService);
    siteController = moduleRef.get<SiteController>(SiteController);
  });

  it('getSites', async () => {
    // jest
    //   .spyOn(usersAdminService, 'login')
    //   .mockImplementation(() => Promise.resolve(result));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    expect(await siteController.getSites()).toEqual(mockSites);
  });

  it('getSite', async () => {
    expect(await siteController.getSite({ id: '1' })).toEqual(mockSites[0]);
  });

  it('createSite', async () => {
    expect(
      await siteController.createSite({ siteName: 'siteName' }, null),
    ).toEqual({ id: newSite.id });
  });

  it('updateSite', async () => {
    expect(
      await siteController.updateSite(
        { id: '1' },
        { siteName: 'siteName2' },
        null,
      ),
    ).toEqual({
      id: newSite.id,
    });
  });
});
