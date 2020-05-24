import { Super } from './super.model';

export class User extends Super<User> {

  login: string;
  last_login: string;
  password: string;
  city: string;

}
