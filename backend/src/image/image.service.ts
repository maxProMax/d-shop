/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { unlink } from 'fs/promises';
import { STATIC_ROOT_DIR, SERVER_ROOT_DIR } from '@/constants';
import { Image } from './image.entity';

const createImage = (image: Image, imgDto?: Express.Multer.File) => {
  return Object.assign(image, {
    ...imgDto,
    originalPath: imgDto?.path,
    path: imgDto?.path.replace(STATIC_ROOT_DIR, SERVER_ROOT_DIR),
  });
};

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}

  create(img?: Express.Multer.File) {
    const image = new Image();

    return createImage(image, img);
  }

  async save(img?: Express.Multer.File) {
    if (!img) {
      return null;
    }

    const image = new Image();

    return this.imageRepo.save(createImage(image, img));
  }

  async update(id: string, img?: Express.Multer.File) {
    const image = await this.imageRepo.findOneBy({ id });

    if (!img) {
      return null;
    }

    await unlink(image.originalPath);

    return this.imageRepo.save(createImage(image, img));
  }

  async delete(id: string) {
    const img = await this.imageRepo.findOneBy({ id });

    await unlink(img.originalPath);

    return this.imageRepo.remove(img);
  }
}
