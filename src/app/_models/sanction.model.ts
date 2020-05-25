import { Super } from './super.model';

export class Sanction extends Super<Sanction> {
    public user_id : number;
    public subject_id?: number;
    public subject: string;
    public raison: string;
    public decision: string;
    public start_date: Date;
    public days: number;

}
