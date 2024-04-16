import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'customer') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log(2, { user });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
