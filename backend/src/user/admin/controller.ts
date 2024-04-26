import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersAdminService } from './service';
import { AdminAuthGuard, AdminSessionGuard } from './guards';
import { UserDto, UserLoginDto, UserUpdateDto } from './types';

@Controller('admin/')
export class AdminUserController {
  constructor(private service: UsersAdminService) {}

  @UseGuards(AdminAuthGuard)
  @Post('/login')
  loginAdmin(@Body() body: UserLoginDto) {
    return this.service.login(body.email);
  }

  @UseGuards(AdminSessionGuard)
  @Post('/registration')
  async registerAdmin(@Body() body: UserDto) {
    return this.service.registration(body);
  }

  @UseGuards(AdminSessionGuard)
  @Get('/protected')
  getHello(@Request() req) {
    console.log(req.session);

    return req.user;
  }

  @UseGuards(AdminSessionGuard)
  @Get('/check')
  getCheck() {
    return { isValid: true };
  }

  @UseGuards(AdminSessionGuard)
  @Get('/users')
  getUsers() {
    return this.service.findAll();
  }

  @UseGuards(AdminSessionGuard)
  @Get('/users/:id')
  getUser(@Param() params: { id: number }) {
    return this.service.findOneById(params.id);
  }

  @UseGuards(AdminSessionGuard)
  @Put('/users/:id')
  updateUser(@Param() params: { id: number }, @Body() body: UserUpdateDto) {
    return this.service.update(params.id, body);
  }

  @UseGuards(AdminSessionGuard)
  @Delete('/users/:id')
  deleteUser(@Param() params: { id: number }) {
    return this.service.delete(params.id);
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { loggedOut: true };
  }
}
