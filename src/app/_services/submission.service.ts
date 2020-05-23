import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Submission } from '../_models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  add(formData: FormData): Promise<Submission> {
    return this.http.post<Submission>(Routes.SUBMISSION, formData).toPromise();
  }

  users(): Promise<any> {
    return this.http.get<any>(Routes.USERS).toPromise();
  }

  update(formData: FormData, id: number): Promise<Submission> {
    return this.http.post<Submission>(`${Routes.SUBMISSION}/${id}`, formData).toPromise();
  }

  find(id: number) : Promise<Submission> {
    return this.http.get<Submission>(`${Routes.SUBMISSION}/${id}`).toPromise();
  }
}