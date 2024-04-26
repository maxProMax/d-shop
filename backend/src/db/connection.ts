import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '@/user/admin/user.entity';
import { User } from '@/user/customer/user.entity';

export const dbConnection = () => {
  return TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [AdminUser, User],
    synchronize: true,
    autoLoadEntities: true,
  });
};
