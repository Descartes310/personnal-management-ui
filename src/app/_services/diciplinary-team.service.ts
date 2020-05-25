import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { DisciplinaryTeam } from '../_models/disciplinary-team.model';

@Injectable({
  providedIn: 'root',
})
export class DiciplinaryTeamService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<DisciplinaryTeam> {
        return this.http.post<DisciplinaryTeam>(Routes.DISCIPLINARYTEAM, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<DisciplinaryTeam> {
        return this.http.post<DisciplinaryTeam>(`${Routes.DISCIPLINARYTEAM}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<DisciplinaryTeam> {
        return this.http.get<DisciplinaryTeam>(`${Routes.DISCIPLINARYTEAM}/${id}`).toPromise();
    }

}