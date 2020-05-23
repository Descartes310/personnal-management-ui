import { Super } from './super.model';

export class Disciplinaryboard extends Super<Disciplinaryboard>{

    public id:number;
    public user_id:number;
    public disciplinary_team_id:number;
    public effective_active:any;
    public raison:string;
    public location:string;
    public decision:string;
}



