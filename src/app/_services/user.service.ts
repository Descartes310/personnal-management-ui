import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<User> {
        return this.http.post<User>(Routes.USER, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<User> {
        return this.http.post<User>(`${Routes.USER}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.USER).toPromise();
    }

    find(id: number): Promise<User> {
        return this.http.get<User>(`${Routes.USER}/${id}`).toPromise();
    }

    delete(id: number): Promise<User[]> {
        return this.http.delete<User[]>(`${Routes.USER}/${id}`).toPromise();
    }

}