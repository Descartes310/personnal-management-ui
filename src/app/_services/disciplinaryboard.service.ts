import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Disciplinaryboard } from '../_models/disciplinaryboard.model';

@Injectable({
  providedIn: 'root',
})
export class Disciplinary-boardService {

  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.DISCIPLINARYBOARD).toPromise();
    }

    add(formData: FormData): Promise<Disciplinaryboard> {
        return this.http.post<Disciplinary-board>(Routes.DISCIPLINARYBOARD, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Disciplinaryboard> {
        return this.http.post<Disciplinaryboard>(`${Routes.DISCIPLINARYBOARD}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Disciplinaryboard> {
        return this.http.get<Disciplinaryboard>(`${Routes.DISCIPLINARYBOARD}/${id}`).toPromise();
    }

    delete(id: number): Promise<Disciplinaryboard[]> {
        return this.http.delete<Disciplinaryboard[]>(`${Routes.DISCIPLINARYBOARD}/${id}`).toPromise();
    }

}