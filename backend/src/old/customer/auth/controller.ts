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
import { LocalAuthGuard } from './local.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth/customer')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() body: Record<string, any>) {
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
