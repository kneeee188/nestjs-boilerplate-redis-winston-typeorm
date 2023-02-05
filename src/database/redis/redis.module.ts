// cache-manager has error on integrating with redis now. use jestjs-redis instead [5.feb.2023]
import {  Module } from '@nestjs/common';
import { IRedisService } from './interfaces/redis.interface';
import { RedisService } from './redis.service';
import { RedisModule as redisModule } from '@liaoliaots/nestjs-redis';


const RedisSettingModule = redisModule.forRoot({
    config: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  });

@Module({
    imports:[
        RedisSettingModule
    ],
  providers: [{
      provide: IRedisService,
      useClass: RedisService
  }],
  exports:[IRedisService]
})
export class RedisModule {}
