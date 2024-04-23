import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { Site } from './site.entity';
import { Image } from '../image/image.entity';
import { ImageModule } from '../image/image.module';
// import { ImageService } from '../image/image.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ImageModule, TypeOrmModule.forFeature([Site, Image])],
  controllers: [SiteController],
  providers: [SiteService],
  exports: [SiteService],
})
export class SiteModule {}
