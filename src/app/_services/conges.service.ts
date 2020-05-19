import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Conge } from '../_models/conges.model';

@Injectable({
  providedIn: 'root',
})
export class CongeService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Conge> {
        return this.http.post<Conge>(Routes.CONGE, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Conge> {
        return this.http.post<Conge>(`${Routes.CONGE}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.CONGE).toPromise();
    }

    permissions(): Promise<any> {
        return this.http.get<any>(Routes.PERMISSION).toPromise();
    }

    find(id: number): Promise<Conge> {
        return this.http.get<Conge>(`${Routes.CONGE}/${id}`).toPromise();
    }

    delete(id: number): Promise<Conge[]> {
        return this.http.delete<Conge[]>(`${Routes.CONGE}/${id}`).toPromise();
    }

}