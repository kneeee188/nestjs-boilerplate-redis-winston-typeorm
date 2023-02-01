import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from '../interfaces/userEntity.interface';

@Entity({ name: 'user' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
