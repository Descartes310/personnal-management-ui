import { Super } from './super.model';
import { HttpClient } from '@angular/common/http';

export class DisciplinaryTeam extends Super<DisciplinaryTeam>{

    public name: string;
    public users: any[];
}