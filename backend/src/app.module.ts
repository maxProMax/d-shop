import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthAdminModule } from './old/admin/auth-admin/auth-admin.module';
// import { UsersAdminModule } from './old/admin/user-admin/user-admin.module';
// import { CustomerAuthModule } from './old/customer/auth/module';
// import { AuthModule } from './auth/module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminUser } from './users/admin/user.entity';
import { User } from './users/customer/user.entity';
import { SessionModule } from './session/module';
import { UsersAdminModule } from './users/admin/module';
import { UsersModule } from './users/customer//module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    UsersAdminModule,
    UsersModule,
    // AuthAdminModule,
    // UsersAdminModule,
    // CustomerAuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [AdminUser, User],
      synchronize: true,
    }),
    SessionModule,
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
