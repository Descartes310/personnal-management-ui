import { Super } from './super.model';

export class DisciplinaryBoard extends Super<DisciplinaryBoard> {

    public user_id: number;
    public user: any;
    public raison: string;
    public disciplinary_team_id: number;
    public disciplinaryteam: any;
    public location: string;
    public effective_date: string;
    public decision: string;
}
