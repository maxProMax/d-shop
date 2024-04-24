import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // app.use(
  //   session({
  //     secret: 'secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     name: 'SESSION',
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(4000);
}
bootstrap();
