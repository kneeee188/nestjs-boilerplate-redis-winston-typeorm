import { Injectable } from '@nestjs/common';
import { ILoggerService } from 'src/logger/interfaces/logger-service.interface';
import { IUserRepository } from './interfaces/user-repository.interface';
import { IUserService } from './interfaces/user-service.interface';

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
