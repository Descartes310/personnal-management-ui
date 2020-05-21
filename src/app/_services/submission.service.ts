import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';


@Injectable({
  providedIn: 'root',
})
export class SubmissionService {

  constructor(
    private http: HttpClient,
  ) { }


  all(): Promise<any> {
    return this.http.get<any>(Routes.SUBMISSION).toPromise();
  }

}