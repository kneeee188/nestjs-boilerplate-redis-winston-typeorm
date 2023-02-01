import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './interfaces/userRepository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
