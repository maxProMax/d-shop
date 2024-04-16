import { Module } from '@nestjs/common';
import { UsersAdminService } from './user-admin.service';

@Module({
  providers: [UsersAdminService],
  exports: [UsersAdminService],
})
export class UsersAdminModule {}
