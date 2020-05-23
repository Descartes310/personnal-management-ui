import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Licensetype } from '../_models/licensetype.model';

@Injectable({
  providedIn: 'root',
})
export class LicensetypeService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Licensetype> {
        return this.http.post<Licensetype>(Routes.LICENSETYPE, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Licensetype> {
        return this.http.post<Licensetype>(`${Routes.LICENSETYPE}/${id}`, formData).toPromise();
    }
    find(id: number): Promise<Licensetype> {
        return this.http.get<Licensetype>(`${Routes.LICENSETYPE}/${id}`).toPromise();
    }
<<<<<<< HEAD
=======
    
    all(): Promise<any> {
      return this.http.get<any>(Routes.LICENSE_TYPE).toPromise();
    }

    delete(id: number): Promise<Licensetype[]> {
      return this.http.delete<Licensetype[]>(`${Routes.LICENSE_TYPE}/${id}`).toPromise();
     }
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}