import { Super } from './super.model';

export class Contract extends Super<Contract> {

    public user_id: number;
    public type: string;
    public name: string;
    public title: string;
    public terms: Text;
    public free_days: number;
    public start_date: Date;
    public end_date: Date;
    public is_active: boolean;
    public file: File;
    
}