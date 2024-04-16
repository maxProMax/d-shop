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
import { AuthAdminService } from './auth-admin.service';
import { LocalAuthGuard, LocalAuthGuard2 } from './local.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth/admin')
export class AuthAdminController {
  constructor(private authService: AuthAdminService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() body: Record<string, any>) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(LocalAuthGuard2)
  @Post('/login-2')
  login2(@Body() body: Record<string, any>) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req) {
    return req.user;
  }

  @Get('/test')
  test(@Session() session: ExpressSession) {
    return session;
  }
}
