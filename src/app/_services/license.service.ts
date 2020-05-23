import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { License } from '../_models/license.model';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<License> {
        return this.http.post<License>(Routes.LICENSE, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<License> {
        return this.http.post<License>(`${Routes.LICENSE}/${id}`, formData).toPromise();
    }

    find(id: number): Promise<License> {
      return this.http.get<License>(`${Routes.LICENSE}/${id}`).toPromise();
  }

    license_type(): Promise<any> {
      return this.http.get<any>(Routes.LICENSE_TYPE).toPromise();
  }
<<<<<<< HEAD
=======

  all(): Promise<any> {
    return this.http.get<any>(Routes.LICENSE).toPromise();
  }
  
  delete(id: number): Promise<License[]> {
    return this.http.delete<License[]>(`${Routes.LICENSE}/${id}`).toPromise();
  }
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}