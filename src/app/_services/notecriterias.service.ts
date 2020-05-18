import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Notecriterias } from '../_models/notecriterias.model';

@Injectable({
  providedIn: 'root',
})
export class NotecriteriasService {

  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.NOTECRITERIAS).toPromise();
    }

    add(formData: FormData): Promise<Notecriterias> {
        return this.http.post<Notecriterias>(Routes.NOTECRITERIAS, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Notecriterias> {
        return this.http.post<Notecriterias>(`${Routes.NOTECRITERIAS}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Notecriterias> {
        return this.http.get<Notecriterias>(`${Routes.NOTECRITERIAS}/${id}`).toPromise();
    }

    delete(id: number): Promise<Notecriterias[]> {
        return this.http.delete<Notecriterias[]>(`${Routes.NOTECRITERIAS}/${id}`).toPromise();
    }

}