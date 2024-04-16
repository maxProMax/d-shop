import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { LocalStrategy, LocalStrategy2 } from './local.strategy';
import { UsersAdminModule } from '../user-admin/user-admin.module';
import { SessionSerializer } from './session.serializer';

import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [UsersAdminModule, PassportModule.register({ session: true })],
  controllers: [AuthAdminController],
  providers: [
    AuthAdminService,
    LocalStrategy,
    LocalStrategy2,
    SessionSerializer,
  ],
})
export class AuthAdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'SOME SESSION SECRET',
          resave: false,
          saveUninitialized: false,
          name: 'ADMIN_SESSION',
        }),
        // passport.session(),
      )
      .forRoutes(AuthAdminController);
  }
}
