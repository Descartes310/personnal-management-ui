import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { DiciplinaryTeam } from '../_models/diciplinary-team.model';

@Injectable({
  providedIn: 'root',
})
export class DiciplinaryTeamService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<DiciplinaryTeam> {
        return this.http.post<DiciplinaryTeam>(Routes.DiciplinaryTeam, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<DiciplinaryTeam> {
        return this.http.post<DiciplinaryTeam>(`${Routes.DiciplinaryTeam}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<DiciplinaryTeam> {
        return this.http.get<DiciplinaryTeam>(`${Routes.DiciplinaryTeam}/${id}`).toPromise();
    }

}