// cache-manager has error on integrating with redis now. use jestjs-redis instead [5.feb.2023]
import { Module } from '@nestjs/common';
import { IRedisService } from './interfaces/redis.interface';
import { RedisService } from './redis.service';
import {
  RedisModule as _RedisModule,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    _RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: IRedisService,
      useClass: RedisService,
    },
  ],
  exports: [IRedisService],
})
export class RedisModule {}
