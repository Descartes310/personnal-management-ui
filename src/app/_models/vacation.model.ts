<<<<<<< HEAD
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
    public accorded_start_date: number;
    public accorded_days: Date ;
    public vacations: any[];
    
}
=======
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
    public accorded_start_date: number;
    public accorded_days: Date ;
    public vacations: any[];
    public created_at: Date;
    
}
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
