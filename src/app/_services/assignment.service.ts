import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Assignment } from '../_models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http : HttpClient) { }

  add(formData: FormData): Promise<Assignment>{
    return this.http.post<Assignment>(Routes.ASSIGNMENT, formData).toPromise();
  }

  typeAssignment(): Promise<any> {
    return this.http.get<any>(Routes.ASSIGNMENT_TYPE).toPromise();
  }
  users(): Promise<any> {
    return this.http.get<any>(Routes.USERS).toPromise();
  }
}
