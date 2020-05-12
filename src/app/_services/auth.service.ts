import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

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
        console.log(datas)
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

    // logout() {
    //     if (this.isAuthenticated()) {
    //         this.http.delete(Routes.LOGOUT).subscribe(() => { });
    //       }
          
    //       localStorage.clear();
    //       // Redirection apres deconnexion
    //       this.router.navigate(['login']);
    // }

    /**
     * Cette fonction va sauvegarder le token du user
     * @param token // token
     */
    saveToken(token: any) {
        localStorage.setItem('token', JSON.stringify(token));
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

    hasPermission(permissions: string[]): boolean {
        let authorized = false;
        if(permissions.length > 0) {
            this.getPermissions().filter(permission => {
              if(permissions.includes(permission.name))
                authorized = true;
            })
            if(authorized) {
              return true;
            } else {
              return false;
            }
        } else{
            return false;
        }
    }

    isLogged(): boolean{
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

}