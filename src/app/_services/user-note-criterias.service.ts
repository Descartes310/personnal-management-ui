import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { UserNoteCriterias } from '../_models/user_note_criterias';

@Injectable({
  providedIn: 'root',
})
export class UserNoteCriteriasService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<UserNoteCriterias> {
        return this.http.post<UserNoteCriterias>(Routes.USER_NOTE_CRITERIAS, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<UserNoteCriterias> {
        return this.http.post<UserNoteCriterias>(`${Routes.USER_NOTE_CRITERIAS}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.USER_NOTE_CRITERIAS).toPromise();
    }

    find(id: number): Promise<UserNoteCriterias> {
        return this.http.get<UserNoteCriterias>(`${Routes.USER_NOTE_CRITERIAS}/${id}`).toPromise();
    }

    delete(id: number): Promise<UserNoteCriterias[]> {
        return this.http.delete<UserNoteCriterias[]>(`${Routes.USER_NOTE_CRITERIAS}/${id}`).toPromise();
    }

}