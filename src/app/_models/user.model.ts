<<<<<<< HEAD
import { Super } from './super.model';

export class User extends Super<User> {

    public login:string;
    public password:String;

    
}
=======
import { Super } from './super.model';

export class User extends Super<User> {
    public id:number;
    public login: string;
    public last_login: string;
    public created_at: Date;
    public updated_at: Date;
    public password:String;

    
}
>>>>>>> cc1a41d96a434b90b49af843ecabca751037be02
