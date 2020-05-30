import {UserType} from './enums';

export class UserFindDto {
  name: string;
  lastName: string;
  surName: string;
  phone: string;
  email: string;
  available: boolean;
  userType: UserType;
}
