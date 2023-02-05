import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { IRedisService } from './interfaces/redis.interface';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements IRedisService {
    constructor(
        @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redis: Redis,
    ) {}

    async get(key: string) {
        const value = await this.redis.get(key);
        return value;
    }
    
    async set(key: string, _value: string) {
        const result = await this.redis.set(key, _value);
        return result;
    }
}
