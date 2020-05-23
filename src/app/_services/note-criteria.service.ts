import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as Routes from '../Routes';
import {NoteCriteria} from '../_models/note_criterias.model';

@Injectable({
  providedIn: 'root'
})
export class NoteCriteriaService {

  constructor(private http: HttpClient,
    ) { }
    add(formData: FormData): Promise<NoteCriteria> {
      return this.http.post<NoteCriteria>(Routes.NOTECRITERIA, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<NoteCriteria> {
      return this.http.post<NoteCriteria>(`${Routes.NOTECRITERIA}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<NoteCriteria> {
      return this.http.get<NoteCriteria>(`${Routes.NOTECRITERIA}/${id}`).toPromise();
    }
}
