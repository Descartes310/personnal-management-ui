import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Division } from '../_models/division.model';

@Injectable({
  providedIn: 'root',
})
export class DivisionService {
  divisions() {
    return this.http.get<any>(Routes.DIVISION).toPromise();
  }

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Division> {
        return this.http.post<Division>(Routes.DIVISION, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Division> {
        return this.http.put<Division>(`${Routes.DIVISION}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.DIVISION).toPromise();
    }


    find(id: number): Promise<Division> {
        return this.http.get<Division>(`${Routes.DIVISION}/${id}`).toPromise();
    }

    delete(id: number): Promise<Division[]> {
        return this.http.delete<Division[]>(`${Routes.DIVISION}/${id}`).toPromise();
    }

    

}