import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service';

@Injectable()
export class AdminAuthStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateAdminUser(username, password);
    console.log({ user });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class CustomerAuthStrategy extends PassportStrategy(
  Strategy,
  'customer',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateCustomerUser(
      username,
      password,
    );
    console.log(2, { user });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class GuestAuthStrategy extends PassportStrategy(Strategy, 'guest') {
  async validate(): Promise<any> {
    return { guest: true };
  }
}
