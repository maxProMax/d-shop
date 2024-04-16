import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAdminService } from '../user-admin/user-admin.service';

@Injectable()
export class AuthAdminService {
  constructor(private usersService: UsersAdminService) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
