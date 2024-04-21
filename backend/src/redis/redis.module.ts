import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
/*
https://docs.nestjs.com/modules
*/

@Module({
  imports: [],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
