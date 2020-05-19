import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Sanction } from '../_models/sanction.model';

@Injectable({
  providedIn: 'root',
})
export class SanctionService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Sanction> {
        return this.http.post<Sanction>(Routes.SANCTION, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Sanction> {
        return this.http.post<Sanction>(`${Routes.SANCTION}/${id}`, formData).toPromise();
    }
    find(id: number): Promise<Sanction> {
        return this.http.get<Sanction>(`${Routes.SANCTION}/${id}`).toPromise();
    }
    delete(id: number): Promise<Sanction[]> {
        return this.http.delete<Sanction[]>(`${Routes.SANCTION}/${id}`).toPromise();
    }
    all(): Promise<any> {
        return this.http.get<any>(Routes.SANCTION).toPromise();
    }
}