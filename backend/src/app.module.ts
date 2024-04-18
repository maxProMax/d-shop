import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthAdminModule } from './old/admin/auth-admin/auth-admin.module';
// import { UsersAdminModule } from './old/admin/user-admin/user-admin.module';
// import { CustomerAuthModule } from './old/customer/auth/module';
// import { AuthModule } from './auth/module';
import { ConfigModule } from '@nestjs/config';
// import { AdminUser } from './users/admin/user.entity';
// import { User } from './users/customer/user.entity';
import { SessionModule } from './session/module';
import { UsersAdminModule } from './users/admin/module';
import { UsersModule } from './users/customer/module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SiteModule } from './site/site.module';
import { dbConnection } from '@/db/connection';

// import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    dbConnection(),
    // AuthModule,
    UsersAdminModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    // ImageModule,
    SiteModule,

    // AuthAdminModule,
    // UsersAdminModule,
    // CustomerAuthModule,
    SessionModule,
    // MulterModule.register({
    //   dest: './files',
    // }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/public',
    }),
  ],
  // controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
