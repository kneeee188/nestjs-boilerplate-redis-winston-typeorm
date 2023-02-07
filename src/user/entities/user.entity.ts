import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserEntity } from '../interfaces/user-entity.interface';
import { UserStatus, UserType } from '../user.constants';

@Entity({ name: 'user' })
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  type: UserType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'boolean' })
  addressOpen: boolean;

  @Column({
    type: 'enum',
    enum: UserStatus,
  })
  status: UserStatus;
}
