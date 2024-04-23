import { Module, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from './constants';
/*
https://docs.nestjs.com/modules
*/

@Module({})
export class RedisModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_OPTIONS,
          useValue: options,
        },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
