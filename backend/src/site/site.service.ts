/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Image } from '../image/image.entity';
import { Site } from './site.entity';
import { SiteCreateDto } from './types';
import { ImageService } from '../image/image.service';
import { unlink } from 'fs/promises';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepo: Repository<Site>,
    // @InjectRepository(Image) private imageRepo: Repository<Image>,
    private readonly imageService: ImageService,
  ) {}

  async create(siteDto: SiteCreateDto, file: Express.Multer.File) {
    const site = new Site();
    const image = await this.imageService.save(file);

    const { id } = await this.siteRepo.save(
      Object.assign(site, { ...siteDto, logo: image }),
    );

    return { id };
  }

  async update(id: number, siteDto: SiteCreateDto, file: Express.Multer.File) {
    const site = await this.findOne(id);

    if (file) {
      site?.logo?.id && (await this.imageService.delete(site.logo.id));

      const image = await this.imageService.save(file);

      site.logo = image;
    }

    await this.siteRepo.save(Object.assign(site, { ...siteDto }));

    return { id };
  }

  async findAll() {
    return this.siteRepo.find({ relations: { logo: true } });
  }

  async findOne(id: number) {
    return this.siteRepo.findOne({ where: { id }, relations: { logo: true } });
  }

  async delete(id: number) {
    const site = await this.findOne(id);
    const logo = site.logo;

    await this.siteRepo.delete({ id });

    if (logo?.id) {
      await this.imageService.delete(logo.id);

      await unlink(logo.originalPath);
    }

    return { isOk: true };
  }
}
