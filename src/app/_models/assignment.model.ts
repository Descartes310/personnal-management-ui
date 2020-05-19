import { Super } from './super.model';

export class Assignment extends Super<Assignment> {

    public user_id: number;
    public aassignment_type_id: number;
    public destination:string;
    public signature_date:Date;
    public installation_date: Date;
    public raison: string;
    public description: string;
    public users: any[];
}
