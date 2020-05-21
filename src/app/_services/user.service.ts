import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { User } from '../_models/user.model';


/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  add(formData: FormData): Promise<User> {
    return this.http.post<User>(Routes.USERS, formData).toPromise();
  }

  update(formData: FormData, id: number): Promise<User> {
    return this.http.post<User>(`${Routes.USERS}/${id}`, formData).toPromise();
  }

  allUsers(): Promise<any> {
    return this.http.get<any>(Routes.USERS).toPromise();
  }

  findUser(id: number): Promise<any> {
    return this.http.get<any>(Routes.FIND_USSER+'/'+id).toPromise();
  }

}