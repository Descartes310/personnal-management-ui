import { Super } from  './super.model';

export class Training extends Super<Training> {

    public id: number;
    public name: string;
    public slug: string;
    public trainer: string;
    public description: string;
    public start_date: Date;
    public duration : number;
    public location: string;
    public is_online: number;
}