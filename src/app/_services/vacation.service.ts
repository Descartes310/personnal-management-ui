import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Vacation } from '../_models/vacation.model';

@Injectable({
  providedIn: 'root',
})
export class VacationService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Vacation> {
        return this.http.post<Vacation>(Routes.VACATION, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Vacation> {
        return this.http.post<Vacation>(`${Routes.VACATION}/${id}`, formData).toPromise();
    }
    find(id: number): Promise<Vacation> {
        return this.http.get<Vacation>(`${Routes.VACATION}/${id}`).toPromise();
    }
    
    
}