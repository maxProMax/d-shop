import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAdminService } from './service';

@Injectable()
export class AdminAuthStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private service: UsersAdminService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.service.validate(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
