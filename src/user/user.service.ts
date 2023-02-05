import { Injectable } from '@nestjs/common';
import { ILoggerService } from 'src/logger/interfaces/loggerService.interface';
import { IUserRepository } from './interfaces/userRepository.interface';
import { IUserService } from './interfaces/userService.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly loggerService: ILoggerService,
  ) {}

  findAll() {
    this.loggerService.info('log test');
    return this.userRepository.findAll();
  }
}
