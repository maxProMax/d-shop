import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('admin') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return result;
  }
}

@Injectable()
export class AdminSessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request?.session?.passport?.user?.type === 'admin';
  }
}
