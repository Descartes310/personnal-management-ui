import { Super } from  './super.model';

export class Division extends Super<Division> {

    public name: string;
    public slug: string;
    public description: string;
    public parent_id : number;

    
}