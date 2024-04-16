import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller';
import { AuthService } from './service';
import { SessionSerializer } from './session.serializer';
import {
  AdminAuthStrategy,
  CustomerAuthStrategy,
  GuestAuthStrategy,
} from './local.strategy';
import { UsersAdminModule } from '../../users/admin/module';
import { UsersModule } from '../../users/customer/module';

import { SessionModule } from '../../session/module';

import * as session from 'express-session';
import * as passport from 'passport';

@Module({
  imports: [
    UsersAdminModule,
    UsersModule,
    SessionModule,
    // PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    // SessionSerializer,
    AuthService,
    AdminAuthStrategy,
    GuestAuthStrategy,
    CustomerAuthStrategy,
  ],
})
export class AuthModule {}
// export class AuthModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     console.log('MiddlewareConsumer');

//     consumer
//       .apply(
//         session({
//           secret: 'SOME SESSION SECRET',
//           resave: false,
//           saveUninitialized: false,
//           // name: 'ADMIN_SESSION',
//         }),
//         passport.session(),
//       )
//       .forRoutes('auth/');
//   }
// }
