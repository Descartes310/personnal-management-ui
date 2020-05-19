import { Super } from './super.model';

export class Sanction extends Super<Sanction> {

    public user_id: string;
    public subject: string;
    public subject_id: string;
    public raison : any;
    public  decision:string;
    public start_date:any;
    public days:number;
}