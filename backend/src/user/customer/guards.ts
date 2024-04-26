import { v4 as uuidv4 } from 'uuid';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GuestAuthGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    request.session.passport = { user: { id: uuidv4(), type: 'guest' } };

    return true;

    // try {
    //   // const result = (await super.canActivate(context)) as boolean;
    //   // const request = context.switchToHttp().getRequest();
    //   // await super.logIn(request);
    //   // return result;
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

@Injectable()
export class CustomerAuthGuard extends AuthGuard('customer') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class UserSessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return ['user', 'guest'].includes(request?.session?.passport?.user?.type);
  }
}
