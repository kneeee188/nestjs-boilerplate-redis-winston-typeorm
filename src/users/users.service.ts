import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
