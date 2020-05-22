import { Super } from './super.model';

export class Vacation extends Super<Vacation> {

    public user_id: Number;
    public vacation_type_id: Number;
    public raison: String;
    public description: String;
    public requested_start_date: Date;
    public accorded_start_date: Date;
    public requested_days: Number;
    public accorded_days: Number;
    public created_at: Date;
    public status: String;
    
}
