import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { UsersService } from './service';
import { CustomerAuthGuard, GuestAuthGuard } from './guards';
import { UserDto } from './types';

@Controller('customer/')
export class UserController {
  constructor(private service: UsersService) {}

  @UseGuards(GuestAuthGuard)
  @Post('/login/guest')
  guestCustomer() {
    // @Request() req: any
    return this.service.loginGuest();
  }

  @Post('/registration')
  registerAdmin(@Body() body: UserDto) {
    return this.service.registration(body);
  }

  @UseGuards(CustomerAuthGuard)
  @Post('/login')
  loginCustomer(@Body() body: Record<string, any>) {
    return this.service.loginCustomer(body.username, body.password);
  }

  // @UseGuards(UserSessionGuard)
  @Get('/protected')
  getHello(@Request() req) {
    console.log(req.session);

    return req.user;
  }
}
