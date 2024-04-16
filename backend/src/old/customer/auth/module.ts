import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller';
import { AuthService } from './service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../user/module';
import { SessionSerializer } from './session.serializer';

import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class CustomerAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'SOME SESSION SECRET',
          resave: false,
          saveUninitialized: false,
          name: 'CLIENT_SESSION',
        }),
        // passport.session(),
      )
      .forRoutes(AuthController);
  }
}
