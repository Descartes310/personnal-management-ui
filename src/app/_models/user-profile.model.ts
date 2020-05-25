import { Super } from './super.model';

export class UserProfile extends Super<UserProfile> {

    public id:number;
    public name: number;
    public last_name: number;
    public value: string;
    public picture: string;
}