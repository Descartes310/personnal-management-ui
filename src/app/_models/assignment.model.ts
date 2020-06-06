import { Super } from './super.model';
import { AssignmentType } from './assignmenttype.model';

export class Assignment extends Super<Assignment> {

    public user_id: number;
    public user?: any;
    public assignment_type?: AssignmentType;
    public assignment_type_id: number;
    public destination:string;
    public signature_date:Date;
    public installation_date: Date;
    public raison: string;
    public description: string;
}
