import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { ProSituation } from '../_models/pro_situation.model';

@Injectable({
  providedIn: 'root',
})
export class ProSituationService {

  constructor(
    private http: HttpClient,
  ) { }

  add(formData: FormData): Promise<ProSituation> {
    return this.http.post<ProSituation>(Routes.PRO_SITUATION, formData).toPromise();
  }

  update(formData: FormData, id: number): Promise<ProSituation> {
    return this.http.post<ProSituation>(`${Routes.PRO_SITUATION}/${id}`, formData).toPromise();
  }

  find(id: number): Promise<ProSituation> {
    return this.http.get<ProSituation>(`${Routes.PRO_SITUATION}/${id}`).toPromise();
  }

}