import { Controller, Get } from '@nestjs/common';
import { IUserController } from './interfaces/userController.interface';
import { IUserService } from './interfaces/userService.interface';

@Controller('user')
export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
