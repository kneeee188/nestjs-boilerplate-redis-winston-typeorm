import { UserStatus, UserType } from '../user.constants';

export abstract class IUserEntity {
  id: number;
  type: UserType;
  name: string;
  email: string;
  address: string;
  addressOpen: boolean;
  status: UserStatus;
}
