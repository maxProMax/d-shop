import {
  Post,
  Body,
  // UseGuards,
  Get,
  // Request,
  Put,
  Param,
  Delete,
  Controller,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { STATIC_ROOT_DIR } from '@/constants';
import { SiteService } from './site.service';
import { SiteCreateDto } from './types';
/*
https://docs.nestjs.com/controllers#controllers
*/

@Controller('/site')
export class SiteController {
  constructor(private readonly service: SiteService) {}

  @Get('/')
  getSites() {
    return this.service.findAll();
  }

  @Get('/:id')
  getSite(@Param() params: { id: number }) {
    return this.service.findOne(params.id);
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', { dest: `./${STATIC_ROOT_DIR}/site` }),
  )
  createSite(
    @Body() body: SiteCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file);
  }

  @Delete('/:id')
  deleteSite(@Param() params: { id: number }) {
    return this.service.delete(params.id);
  }
}
