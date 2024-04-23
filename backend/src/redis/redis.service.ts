/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Inject } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from './constants';

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject(REDIS_OPTIONS) options: RedisOptions) {
    super(options);
  }
}
