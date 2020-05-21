import { Super } from './super.model';

export class DisciplinaryBoards extends Super<DisciplinaryBoards> {

    public effective_date: Date;
    public decision: string;
    public location: string;
    public raison: string;
    public id: number;
    public user: any;
    
}