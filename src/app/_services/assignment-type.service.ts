import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { AssignmentType } from '../_models/assignment-type.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentTypeService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<AssignmentType> {
        console.log(formData);
        return this.http.post<AssignmentType>(Routes.assignment_type, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<AssignmentType> {
        return this.http.post<AssignmentType>(`${Routes.assignment_type}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<AssignmentType> {
        return this.http.get<AssignmentType>(`${Routes.assignment_type}/${id}`).toPromise();
    }
}