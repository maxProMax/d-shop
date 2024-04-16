import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UsersAdminService } from './service';
import { AdminAuthGuard, AdminSessionGuard } from './guards';
import { UserDto, UserLoginDto } from './types';

@Controller('admin/')
export class AdminUserController {
  constructor(private service: UsersAdminService) {}

  @UseGuards(AdminAuthGuard)
  @Post('/login')
  loginAdmin(@Body() body: UserLoginDto) {
    return this.service.login(body.email);
  }

  @Post('/registration')
  async registerAdmin(@Body() body: UserDto) {
    return this.service.registration(body);
  }

  @UseGuards(AdminSessionGuard)
  @Get('/protected')
  getHello(@Request() req) {
    return req.user;
  }
}
