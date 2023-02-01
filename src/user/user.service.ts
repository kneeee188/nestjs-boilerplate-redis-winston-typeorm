import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/userRepository.interface';
import { IUserService } from './interfaces/userService.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  findAll() {
    return this.userRepository.findAll();
  }
}
