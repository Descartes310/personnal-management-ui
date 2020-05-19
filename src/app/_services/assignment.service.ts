import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Assignment } from '../_models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http : HttpClient) { }

  all(): Promise<any> {
    return this.http.get<any>(Routes.ASSIGNMENT).toPromise();
  }

  add(formData: FormData) : Promise<Assignment>{
    return this.http.post<Assignment>(Routes.ASSIGNMENT, formData).toPromise();
  }

  typeAssignment() : Promise<any> {
    return this.http.get<any>(Routes.ASSIGNMENT_TYPE).toPromise();
  }
  users() : Promise<any> {
    return this.http.get<any>(Routes.USERS).toPromise();
  }

  update(formData: FormData, id: number): Promise<Assignment> {
    return this.http.post<Assignment>(`${Routes.ASSIGNMENT}/${id}`, formData).toPromise();
  }

  find(id: number) : Promise<Assignment> {
    return this.http.get<Assignment>(`${Routes.ASSIGNMENT}/${id}`).toPromise();
  }

  delete(id: number) : Promise<Assignment[]> {
    return this.http.delete<Assignment[]>(`${Routes.ASSIGNMENT}/${id}`).toPromise();
  }
}
