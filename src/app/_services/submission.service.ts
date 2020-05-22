import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { Submission } from '../_models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(
    private http: HttpClient,
  ) { }

  all(): Promise<any> {
    return this.http.get<any>(Routes.SUBMISSION).toPromise();
  }

  find(id: number): Promise<Submission> {
    return this.http.get<Submission>(`${Routes.SUBMISSION}/${id}`).toPromise();
  }

  delete(id: number): Promise<Submission[]> {
    return this.http.delete<Submission[]>(`${Routes.SUBMISSION}/${id}`).toPromise();
  }

}
