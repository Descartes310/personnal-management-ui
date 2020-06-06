import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  @Output() fire: EventEmitter<any> = new EventEmitter();

  constructor(
      private http: HttpClient,
      private router: Router
    ) { }

  login(login: string, password: string, keepMeLoggedIn: boolean): Promise<any> {
        let datas = {
            'login': login,
            'password': password,
            'remember_me': keepMeLoggedIn
        }
        return this.http.post<any>(Routes.LOGIN, datas).toPromise();
    }

    isAuthenticated(){
        let user = this.getUser();
        let token = this.getToken();
        let now = (new Date()).getTime();
        if(user && token) {
            let expires_at = (new Date(token.expires_at)).getTime();
            return now < expires_at;
        } else {
            return false;
        }
    }


    setAuthenticated(value: boolean) {
        this.fire.emit(value);
    }

    getEmittedValue() {
        return this.fire;
    }

    logout() {
        this.http.delete(Routes.LOGIN);
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
        localStorage.removeItem('roles');
        localStorage.removeItem('token');
        this.setAuthenticated(false);
        this.router.navigate(['login']);
    }
    updatePassword(formData:FormData): Promise<any> {

        return this.http.post<any>(Routes.UPDATE_PASSWORD, formData).toPromise();
    }

    /**
     * Cette fonction va sauvegarder le token du user
     * @param token // token
     */
    saveToken(token: any) {
        localStorage.setItem('token', JSON.stringify(token));
        this.setAuthenticated(true);
    }

    getToken(){
       return  JSON.parse(localStorage.getItem('token'));
    }

    saveRoles(roles: any) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    getRoles(){
       return  JSON.parse(localStorage.getItem('roles'));
    }

    savePermissions(permissions: any) {
        localStorage.setItem('permissions', JSON.stringify(permissions));
    }

    getPermissions(){
       return  JSON.parse(localStorage.getItem('permissions'));
    }

    saveUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(){
       return  JSON.parse(localStorage.getItem('user'));
    }

    hasPermission(permissions: string|string[]): boolean {
      const userPermissions: any[] = this.getPermissions();
      if (permissions instanceof Array && permissions.length > 0) {
        let matched = 0;
        for (let i = 0, l = userPermissions.length, m = permissions.length; i < l; i++) {
          if (permissions.includes(userPermissions[i].name)) {
            if (++matched === m) {
              return true;
            }
          }
        }
      } else {
        for (let i = 0, l = userPermissions.length; i < l; i++) {
          if (permissions === userPermissions[i].name) {
            return true;
          }
        }
      }
      return false;
    }
}
