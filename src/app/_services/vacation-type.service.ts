import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as Routes from '../Routes';
import { VacationType } from '../_models/vacation-type.model';

@Injectable({
  providedIn: 'root'
})
export class VacationTypeService {

  constructor(
    private http: HttpClient,
  ) { }
  add(formData: FormData): Promise<VacationType> {
    return this.http.post<VacationType>(Routes.VACATIONTYPE, formData).toPromise();
  }

  update(formData: FormData, id: number): Promise<VacationType> {
    return this.http.post<VacationType>(`${Routes.VACATIONTYPE}/${id}`, formData).toPromise();
  }
  find(id: number): Promise<VacationType> {
    return this.http.get<VacationType>(`${Routes.VACATIONTYPE}/${id}`).toPromise();
  }

}
