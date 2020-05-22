import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { DisciplinaryTeam } from '../_models/disciplinary-team.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaryTeamService {

  constructor(
    private http: HttpClient,
  ) { }

  all(): Promise<DisciplinaryTeam[]> {
    return this.http.get<DisciplinaryTeam[]>(Routes.DISCIPLINARYTEAM).toPromise();
  }

  getDisciplinaryTeamWithUsers(): Promise<any> {
    return this.http.get<any>(Routes.DISCIPLINARYTEAM + '/' + 'getDisciplinaryTeamsWithUsers').toPromise();
}

  find(id: number): Promise<DisciplinaryTeam> {
    return this.http.get<DisciplinaryTeam>(`${Routes.DISCIPLINARYTEAM}/${id}`).toPromise();
}

delete(id: number): Promise<DisciplinaryTeam[]> {
    return this.http.delete<DisciplinaryTeam[]>(`${Routes.DISCIPLINARYTEAM}/${id}`).toPromise();
}
}
