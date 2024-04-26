// import { RedisModule } from './redis/redis.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthAdminModule } from './old/admin/auth-admin/auth-admin.module';
// import { UsersAdminModule } from './old/admin/user-admin/user-admin.module';
// import { CustomerAuthModule } from './old/customer/auth/module';
// import { AuthModule } from './auth/module';
// import { AdminUser } from './users/admin/user.entity';
// import { User } from './users/customer/user.entity';
import { SessionModule } from './session/module';
import { UsersAdminModule } from './user/admin/module';
import { UsersModule } from './user/customer/module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SiteModule } from './site/site.module';
import { dbConnection } from '@/db/connection';
import { CurrencyModule } from './currency/currency.module';
import { CartModule } from './cart/cart.module';
// import { MulterModule } from '@nestjs/platform-express';
import { CheckoutModule } from './checkout/checkout.module';
import { AddressModule } from './user/address/address.module';

// import { ImageModule } from './image/image.module';

// import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    dbConnection(),
    // AuthModule,
    UsersAdminModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    // ImageModule,
    SiteModule,
    CartModule,
    CurrencyModule,
    CheckoutModule,
    AddressModule,

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
