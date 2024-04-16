import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './service';

@Injectable()
export class GuestAuthStrategy extends PassportStrategy(Strategy, 'guest') {
  async validate(): Promise<any> {
    console.log('guest');
    return { guest: true };
  }
}

@Injectable()
export class CustomerAuthStrategy extends PassportStrategy(
  Strategy,
  'customer',
) {
  constructor(private authService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validate(username, password);
    console.log('customer', { user });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
