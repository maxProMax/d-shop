import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Session,
} from '@nestjs/common';
import { Session as ExpressSession } from 'express-session';
import { AuthService } from './service';
import {
  AdminAuthGuard,
  CustomerAuthGuard,
  GuestAuthGuard,
} from './guards/local.auth.guard';
// import { AuthenticatedGuard } from './guards/authenticated.guard';

// import { AuthenticatedGuard } from '../../session/authenticated.guard';

@Controller('auth/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminAuthGuard)
  @Post('/login/admin')
  loginAdmin(@Body() body: Record<string, any>) {
    return this.authService.loginAdmin(body.username, body.password);
  }

  @UseGuards(GuestAuthGuard)
  @Post('/login/guest')
  guestCustomer() {
    return this.authService.loginGuest();
  }

  @UseGuards(CustomerAuthGuard)
  @Post('/login/customer')
  loginCustomer(@Body() body: Record<string, any>) {
    return this.authService.loginCustomer(body.username, body.password);
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req) {
    return req.user;
  }

  @Get('/test')
  test(@Session() session: ExpressSession) {
    return session;
  }
}
