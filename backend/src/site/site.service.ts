/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { SiteCreateDto } from './types';
import { ImageService } from '../image/image.service';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepo: Repository<Site>,
    private readonly imageService: ImageService,
  ) {}

  async create(siteDto: SiteCreateDto, file: Express.Multer.File) {
    const site = new Site();

    if (file) {
      const image = await this.imageService.create(file);
      site.logo = image;
    }

    const { id } = await this.siteRepo.save(Object.assign(site, siteDto));

    return { id };
  }

  async update(id: string, siteDto: SiteCreateDto, file: Express.Multer.File) {
    const site = await this.findOne(id);

    if (file) {
      site.logo = await this.imageService.update(site.logo.id, file);
    }

    await this.siteRepo.save(Object.assign(site, { ...siteDto }));

    return { id };
  }

  async findAll() {
    return this.siteRepo.find({ relations: { logo: true, navigation: true } });
  }

  async findOne(id: string) {
    return this.siteRepo.findOne({
      where: { id },
      relations: { logo: true, navigation: true },
    });
  }

  async delete(id: string) {
    const site = await this.findOne(id);
    const logo = site.logo;

    if (logo?.id) {
      await this.imageService.delete(logo.id);
    } else {
      await this.siteRepo.delete({ id });
    }

    return { isOk: true };
  }
}
