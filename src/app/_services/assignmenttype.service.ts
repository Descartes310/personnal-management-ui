import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { AssignmentType } from '../_models/assignmenttype.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentTypeService {

  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.assignment_type).toPromise();
    }

    add(formData: FormData): Promise<AssignmentType> {
        return this.http.post<AssignmentType>(Routes.assignment_type, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<AssignmentType> {
        return this.http.post<AssignmentType>(`${Routes.assignment_type}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<AssignmentType> {
        return this.http.get<AssignmentType>(`${Routes.assignment_type}/${id}`).toPromise();
    }

    delete(id: number): Promise<AssignmentType[]> {
        return this.http.delete<AssignmentType[]>(`${Routes.assignment_type}/${id}`).toPromise();
    }

}