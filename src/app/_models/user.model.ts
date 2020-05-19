import { Super } from './super.model';

export class User extends Super<User> {
    public id:number;
    public login: string;
    public last_login: string;
    public created_at: Date;
    public updated_at: Date;
    
}
