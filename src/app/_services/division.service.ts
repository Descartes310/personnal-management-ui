import { Injectable } from '@angular/core';
import * as Routes from '../Routes';
import { HttpClient } from '@angular/common/http';
import { Division } from '../_models/division.model';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private http: HttpClient,
  ) { }

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
