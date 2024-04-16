import { Module } from '@nestjs/common';
import { AuthController } from './controller';
import { AuthService } from './service';
import {
  AdminAuthStrategy,
  CustomerAuthStrategy,
  GuestAuthStrategy,
} from './local.strategy';
import { UsersAdminModule } from '../../users/admin/module';
import { UsersModule } from '../../users/customer/module';
import { SessionModule } from '../../session/module';

@Module({
  // imports: [SessionModule],
  // imports: [UsersAdminModule, UsersModule],
  // imports: [UsersAdminModule, UsersModule, SessionModule],
  // controllers: [AuthController],
  providers: [
    // AuthService,
    // AdminAuthStrategy,
    // GuestAuthStrategy,
    // CustomerAuthStrategy,
  ],
})
export class AuthModule {}
