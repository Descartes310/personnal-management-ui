import { Super } from './super.model';

export class Division extends Super<Division> {
    public division: Division;
    public parent_id: number;
    public name: string;
    public slug: string;
    public description: string;  
}