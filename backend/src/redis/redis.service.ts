/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {}
