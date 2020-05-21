import { Super } from './super.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Training extends Super<Training> {

    public name: string;
    public slug: string;
    public trainer : string;
    public description: string;
    public start_date : Date;
    public duration : Number;
    public location : string;
    public is_online: Boolean;
    
}