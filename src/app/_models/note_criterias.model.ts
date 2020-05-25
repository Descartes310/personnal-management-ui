import { Super } from './super.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class NoteCriteria extends Super<NoteCriteria>{
 
    public name: string;
    public slug: string; 
    public max_rate:number;
    public min_rate:number;
    public weight: number;
    public description: string;

}






