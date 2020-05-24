import { Super } from './super.model';

export class Sanction extends Super<Sanction> {

    public subject: string;
    public raison: string;
    public decision: string;
    public start_date: Date;
    public days: number;

}
