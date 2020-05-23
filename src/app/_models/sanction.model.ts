<<<<<<< HEAD
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
=======
import { Super } from './super.model';

export class Sanction extends Super<Sanction> {

    public subject: string;
    public raison: string;
    public decision: string;
    public start_date: Date;
    public days: number;

}
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
