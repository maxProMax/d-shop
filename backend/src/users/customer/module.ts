import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service';
import { UserController } from './controller';
import { CustomerAuthStrategy, GuestAuthStrategy } from './local.strategy';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    CustomerAuthStrategy,
    GuestAuthStrategy,
    UsersService,
  ],
  controllers: [UserController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
