import { Super } from './super.model';

export class License extends Super<License> {
    public user_id: any;
    public license_type_id: any;
    public raison: string;
    public description: string;
    public file:File;
    public requested_start_date: Date;
    public requested_days:number;
    public is_active:boolean;
    public status:string;
}