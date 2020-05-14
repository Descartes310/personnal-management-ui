import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Role } from '../_models/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(
      private http: HttpClient,
    ) { }

    add(formData: FormData): Promise<Role> {
        return this.http.post<Role>(Routes.ROLE, formData).toPromise();
    }

    update(formData: FormData, id: number): Promise<Role> {
        return this.http.post<Role>(`${Routes.ROLE}/${id}`, formData).toPromise();
    }

    all(): Promise<any> {
        return this.http.get<any>(Routes.ROLE).toPromise();
    }

    permissions(): Promise<any> {
        return this.http.get<any>(Routes.PERMISSION).toPromise();
    }

    find(id: number): Promise<Role> {
        return this.http.get<Role>(`${Routes.ROLE}/${id}`).toPromise();
    }

    delete(id: number): Promise<Role[]> {
        return this.http.delete<Role[]>(`${Routes.ROLE}/${id}`).toPromise();
    }

}