import {
  Post,
  Body,
  // UseGuards,
  Get,
  // Request,
  Put,
  Param,
  UseGuards,
  Delete,
  Controller,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminSessionGuard } from '@/users/admin/guards';
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
  getSite(@Param() params: { id: string }) {
    return this.service.findOne(params.id);
  }

  @Post('/')
  @UseGuards(AdminSessionGuard)
  @UseInterceptors(
    FileInterceptor('file', { dest: `./${STATIC_ROOT_DIR}/site` }),
  )
  createSite(
    @Body() body: SiteCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(body, file);
  }

  @Put('/:id')
  @UseGuards(AdminSessionGuard)
  @UseInterceptors(
    FileInterceptor('file', { dest: `./${STATIC_ROOT_DIR}/site` }),
  )
  updateSite(
    @Param() params: { id: string },
    @Body() body: SiteCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(params.id, body, file);
  }

  @Delete('/:id')
  @UseGuards(AdminSessionGuard)
  deleteSite(@Param() params: { id: string }) {
    return this.service.delete(params.id);
  }
}
