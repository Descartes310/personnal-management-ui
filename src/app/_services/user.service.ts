import { Injectable } from '@angular/core';
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
<<<<<<< HEAD
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

=======
    return this.http.post<User>(Routes.USER, formData).toPromise();
  }

  update(formData: FormData, id: number): Promise<User> {
    return this.http.post<User>(`${Routes.USER}/${id}`, formData).toPromise();
  }

  // all(): Promise<any> {
  //     return this.http.get<any>(Routes.USER).toPromise();
  // }

  find(id: number): Promise<User> {
    return this.http.get<User>(`${Routes.USER}/${id}`).toPromise();
  }




  all(): Promise<any> {
    return this.http.get<any>(Routes.USER).toPromise();
  }


  delete(id: number): Promise<User[]> {
    return this.http.delete<User[]>(`${Routes.USER}/${id}`).toPromise();
  }

  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  allProfiles(): Promise<any> {
    return this.http.get<any>(Routes.PROFILES + '/getProfiles').toPromise();
  }


  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  cities(): Promise<any> {
    return this.http.get<any>(Routes.CITIES).toPromise();
  }

  /**
   * @author Arléon Zemtsop
   * @email arleonzemtsop@gmail.com
  */
  getUserInfo(id: number): Promise<any> {
    return this.http.get<any>(Routes.USERS + '/' + id).toPromise();
  }

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}