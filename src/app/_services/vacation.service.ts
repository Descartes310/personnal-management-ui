<<<<<<< HEAD
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
    

    vacation_type():  Promise<any> {
        return this.http.get<any>(Routes.VACATION_TYPE).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.VACATION).toPromise();
    }

    permissions(): Promise<any> {
        return this.http.get<any>(Routes.PERMISSION).toPromise();
    }

    delete(id: number): Promise<Vacation[]> {
        return this.http.delete<Vacation[]>(`${Routes.VACATION}/${id}`).toPromise();
    }


=======
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
    
    vacation_type():  Promise<any> {
        return this.http.get<any>(Routes.VACATION_TYPE).toPromise();
    }


    permissions(): Promise<any> {
        return this.http.get<any>(Routes.PERMISSION).toPromise();
    }

    delete(id: number): Promise<Vacation[]> {
        return this.http.delete<Vacation[]>(`${Routes.VACATION}/${id}`).toPromise();
    }
    all(): Promise<any> {
        return this.http.get<any>(Routes.VACATION).toPromise();
    }

    find(id: number): Promise<Vacation> {
      return this.http.get<Vacation>(`${Routes.VACATION}/${id}`).toPromise();
  }

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}