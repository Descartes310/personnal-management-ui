import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Careers } from '../_models/careers.model';

@Injectable({
  providedIn: 'root',
})
export class CareersService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Careers> {
        return this.http.post<Careers>(Routes.CAREER, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Careers> {
        return this.http.post<Careers>(`${Routes.CAREER}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Careers> {
        return this.http.get<Careers>(`${Routes.CAREER}/${id}`).toPromise();
    }
    users():  Promise<any> {
        return this.http.get<any>(Routes.USERS).toPromise();
    }

    pro_situations():  Promise<any> {
        return this.http.get<any>(Routes.PRO_SITUATION).toPromise();
    }

}