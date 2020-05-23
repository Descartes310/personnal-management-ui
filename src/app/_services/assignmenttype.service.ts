import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Assignmenttype } from '../_models/assignmenttype.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmenttypeService {

  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.assignment_type).toPromise();
    }

    add(formData: FormData): Promise<Assignmenttype> {
        return this.http.post<Assignmenttype>(Routes.assignment_type, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Assignmenttype> {
        return this.http.post<Assignmenttype>(`${Routes.assignment_type}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<Assignmenttype> {
        return this.http.get<Assignmenttype>(`${Routes.assignment_type}/${id}`).toPromise();
    }

    delete(id: number): Promise<Assignmenttype[]> {
        return this.http.delete<Assignmenttype[]>(`${Routes.assignment_type}/${id}`).toPromise();
    }

}