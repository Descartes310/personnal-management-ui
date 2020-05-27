import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { DisciplinaryTeam } from '../_models/disciplinary-team.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaryTeamsService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<DisciplinaryTeam> {
        return this.http.post<DisciplinaryTeam>(Routes.DISCIPLINARY_TEAMS, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<DisciplinaryTeam> {
        return this.http.post<DisciplinaryTeam>(`${Routes.DISCIPLINARY_TEAMS}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<DisciplinaryTeam>(Routes.DISCIPLINARY_TEAMS).toPromise();
    }

    find(id: number): Promise<DisciplinaryTeam> {
        return this.http.get<DisciplinaryTeam>(`${Routes.DISCIPLINARY_TEAMS}/${id}`).toPromise();
    }

    delete(id: number): Promise<DisciplinaryTeam[]> {
        return this.http.delete<DisciplinaryTeam[]>(`${Routes.DISCIPLINARY_TEAMS}/${id}`).toPromise();
    }

}