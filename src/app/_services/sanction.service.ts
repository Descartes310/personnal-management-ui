import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sanction } from '../_models/sanction.model';
import * as Routes from '../Routes'; 
@Injectable({
  providedIn: 'root'
})
export class SanctionService {

  constructor(private http : HttpClient) { }

  add(formData: FormData): Promise<Sanction> {
    return this.http.post<Sanction>(Routes.SANCTION, formData).toPromise();
  }

 users() : Promise<any> {
    return this.http.get<any>(Routes.USERS).toPromise();
  }
}
