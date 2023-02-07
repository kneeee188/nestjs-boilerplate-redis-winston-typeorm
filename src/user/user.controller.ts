import { Controller, Get } from '@nestjs/common';
import { IRedisService } from 'src/database/redis/interfaces/redis.interface';
import { IUserController } from './interfaces/user-controller.interface';
import { IUserService } from './interfaces/user-service.interface';

@Controller('user')
export class UserController implements IUserController {
  constructor(
    private readonly userService: IUserService,
    private readonly redisService: IRedisService,
  ) {}

  @Get()
  async findAll() {
    await this.redisService.set('11', 'bb');
    return this.userService.findAll();
  }
}
