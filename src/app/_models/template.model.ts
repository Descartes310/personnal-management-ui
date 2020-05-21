import { Super } from './super.model';

export class Template extends Super<Template> {

    public id:number;
    public title: string;
    public content: string;
    public type: string;
}