import { Super } from './super.model';

export class Submission extends Super<Submission> {

    public user_id: number;
    public dest_user_id: number;
    public subject: string;
    public message: string;
<<<<<<< HEAD
    public files :File;
=======
    public files: File;
>>>>>>> cc1a41d96a434b90b49af843ecabca751037be02
}
