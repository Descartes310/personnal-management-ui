import { Super } from './super.model';

export class Vacation extends Super<Vacation> {

    public user_id: number;
    public vacation_type_id: number 
    public raison: string;
    public description: string;
    public requested_start_date: Date;
    public requested_days: number;
    public is_active: boolean;
    public status:string;
    public file: File;
}