import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';

import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [SessionSerializer],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'SOME SESSION SECRET',
          resave: false,
          saveUninitialized: false,
        }),
        passport.session(),
      )
      .forRoutes('*');
  }
}
