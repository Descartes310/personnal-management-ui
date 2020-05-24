import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { DisciplinaryTeams } from '../_models/disciplinary_teams.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplinaryTeamsService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<DisciplinaryTeams> {
        return this.http.post<DisciplinaryTeams>(Routes.DISCIPLINARY_TEAMS, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<DisciplinaryTeams> {
        return this.http.post<DisciplinaryTeams>(`${Routes.DISCIPLINARY_TEAMS}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<DisciplinaryTeams>(Routes.DISCIPLINARY_TEAMS).toPromise();
    }

    find(id: number): Promise<DisciplinaryTeams> {
        return this.http.get<DisciplinaryTeams>(`${Routes.DISCIPLINARY_TEAMS}/${id}`).toPromise();
    }

    delete(id: number): Promise<DisciplinaryTeams[]> {
        return this.http.delete<DisciplinaryTeams[]>(`${Routes.DISCIPLINARY_TEAMS}/${id}`).toPromise();
    }

}