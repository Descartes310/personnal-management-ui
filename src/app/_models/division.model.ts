<<<<<<< HEAD
import { Super } from  './super.model';

export class Division extends Super<Division> {

    public name: string;
    public display_name: string;
    public description: string;
    public parent_id : number;

    
=======
import { Super } from './super.model';

export class Division extends Super<Division> {
    public division: Division;
    public parent_id: number;
    public name: string;
    public slug: string;
    public description: string;  
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}