import { Super } from './super.model';

export class Careers extends Super<Careers> {

    public user_id: number;
    public pro_situation_id: number;
    public division_id: number;
    public effective_date: Date;
    public careers : Careers;
    
}