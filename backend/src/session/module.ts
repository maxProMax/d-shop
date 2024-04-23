import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import { SessionSerializer } from './session.serializer';
import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_SESSION_DB_IDX,
  SESSION_TTL,
} from '@/constants';

const redisStore = new RedisStore({
  client: new Redis({
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    db: Number(REDIS_SESSION_DB_IDX),
  }),
});

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
          store: redisStore,
          cookie: { maxAge: SESSION_TTL * 1000 },
        }),
        passport.session(),
      )
      .forRoutes('*');
  }
}
