import { Super } from './super.model';

export class  Vacation extends Super<Vacation> {

    public user_id: number; 
    public vacation_type_id: number;
    public description: string;
    public raison: string;
    public requested_start_date: number;
    public accorded_start_date: number;
    public requested_days: Date;
    public accorded_days: Date ;
    public file: File;
    public status: string;
  vacationss: any[];
    
}