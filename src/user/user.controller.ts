import { Controller, Get } from '@nestjs/common';
import { ILoggerService } from 'src/logger/interfaces/loggerService.interface';
import { IUserController } from './interfaces/userController.interface';
import { IUserService } from './interfaces/userService.interface';

@Controller('user')
export class UserController implements IUserController {
  constructor(
    private readonly userService: IUserService,
    private readonly loggerService: ILoggerService,
  ) {}

  @Get()
  findAll() {
    this.loggerService.getNow();
    return this.userService.findAll();
  }
}
