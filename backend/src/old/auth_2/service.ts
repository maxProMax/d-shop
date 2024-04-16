import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersAdminService } from '../../users/admin/service';
import { UsersService } from '../../users/customer/service';

@Injectable()
export class AuthService {
  constructor(
    private adminUsersService: UsersAdminService,
    private customerUsersService: UsersService,
  ) {}

  async loginAdmin(username: string, pass: string): Promise<any> {
    const user = await this.adminUsersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }

  // async registrationAdmin(username: string, pass: string): Promise<any> {
  //   const user = await this.adminUsersService.create();
  //   console.log(23, { user });

  //   // if (user?.password !== pass) {
  //   //   throw new UnauthorizedException();
  //   // }

  //   // const { password, ...result } = user;
  //   return user;
  // }

  async loginGuest(): Promise<any> {
    return { guest: true };
  }

  async loginCustomer(username: string, pass: string): Promise<any> {
    const user = await this.customerUsersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }

  async validateAdminUser(username: string, pass: string): Promise<any> {
    const user = await this.adminUsersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateCustomerUser(username: string, pass: string): Promise<any> {
    const user = await this.customerUsersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
