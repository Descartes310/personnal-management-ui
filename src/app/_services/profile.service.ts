import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Profile } from '../_models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profiles() {
    return this.http.get<any>(Routes.PROFILE).toPromise();
  }

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Profile> {
        return this.http.post<Profile>(Routes.PROFILE, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Profile> {
        return this.http.put<Profile>(`${Routes.PROFILE}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.PROFILE).toPromise();
    }


    find(id: number): Promise<Profile> {
        return this.http.get<Profile>(`${Routes.PROFILE}/${id}`).toPromise();
    }

    delete(id: number): Promise<Profile[]> {
        return this.http.delete<Profile[]>(`${Routes.PROFILE}/${id}`).toPromise();
    }
}
