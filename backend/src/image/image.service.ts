/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STATIC_ROOT_DIR, SERVER_ROOT_DIR } from '@/constants';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}

  async save(img?: Express.Multer.File) {
    const image = new Image();

    if (!img) {
      return null;
    }

    return this.imageRepo.save(
      Object.assign(image, {
        ...img,
        originalPath: img?.path,
        path: img?.path.replace(STATIC_ROOT_DIR, SERVER_ROOT_DIR),
      }),
    );
  }

  async delete(id: number) {
    return this.imageRepo.delete({ id });
  }
}
