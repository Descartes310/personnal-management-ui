import { Super } from './super.model';

export class User extends Super<User> {

    public id: number;
    public login: string;
    public first_name: string;
    public last_name: string;
    
}