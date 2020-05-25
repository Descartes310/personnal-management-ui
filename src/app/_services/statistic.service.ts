import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Career } from '../_models/career.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private http:HttpClient
  ) { }

  //

  getDatasetUserCareer(user_id:number): Promise<any>{
    return this.http.get<Career>(`${Routes.StatCareer}/${user_id}`).toPromise();
  }
  getAssignmentByMonth(): Promise<any>{
    return this.http.get<any>(`${Routes.StatAssignment}`).toPromise();
  }
}
