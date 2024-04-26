import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersAdminService } from './service';
import { AdminUserController } from './controller';
import { AdminUser } from './user.entity';
import { AdminAuthStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [UsersAdminService, AdminAuthStrategy],
  controllers: [AdminUserController],
  exports: [TypeOrmModule],
})
export class UsersAdminModule {}
