import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Training } from '../_models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * @author warren Taba
   * @fotiewarren50@gmail.com
   */
  add(formData:FormData): Promise<Training>{
    return this.http.post<Training>(Routes.TRAINING, formData).toPromise();
  }
  /**
   * @author warren Taba
   * @fotiewarren50@gmail.com
   */
  update(formData: FormData, id: number): Promise<Training> {
    return this.http.post<Training>(`${Routes.TRAINING}/${id}`, formData).toPromise();
  }
   /**
   * @author warren Taba
   * @fotiewarren50@gmail.com
   */
  find(id: number): Promise<Training> {
        return this.http.get<Training>(`${Routes.TRAINING}/${id}`).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.TRAINING).toPromise();
    } 

    delete(id: number): Promise<Training[]> {
        return this.http.delete<Training[]>(`${Routes.TRAINING}/${id}`).toPromise();
    }

    

}
