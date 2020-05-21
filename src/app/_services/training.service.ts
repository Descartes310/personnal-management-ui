import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Training } from '../_models/training.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
    
  constructor(
      private http: HttpClient,
    ) { }

    all(): Promise<any> {
        return this.http.get<any>(Routes.TRAINING).toPromise();
    }


    find(id: number): Promise<Training> {
        return this.http.get<Training>(`${Routes.TRAINING}/${id}`).toPromise();
    }

    delete(id: number): Promise<Training[]> {
        return this.http.delete<Training[]>(`${Routes.TRAINING}/${id}`).toPromise();
    }

    

}