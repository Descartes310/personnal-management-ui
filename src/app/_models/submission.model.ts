import { Super } from './super.model';

export class Submission extends Super<Submission> {

    public user_id: number;
    public dest_user_id: number;
    public subject: string;
    public message: string;
    public files: File;
}
