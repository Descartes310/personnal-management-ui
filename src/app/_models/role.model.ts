import { Super } from './super.model';

export class Role extends Super<Role> {

    public name: string;
    public display_name: string;
    public description: string;
    public permissions: any[];
    
}