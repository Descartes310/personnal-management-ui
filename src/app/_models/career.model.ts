import { Super } from './super.model';

export class Career extends Super<Career> {
    public user_id: number;
    public pro_situation_id: number;
    public effective_date:string;
}
