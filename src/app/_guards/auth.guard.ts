import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  roles;
  userRoles: any[];
  authorized: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let isLogin = route.data.isLoginRoute ? route.data.isLoginRoute : false;
    this.roles = route.data.roles;
    this.userRoles = this.authService.getRoles();

    if(isLogin && !this.authService.isLogged()) {
      return true
    }
    
    if (!this.authService.isLogged()) {
      this.router.navigate(['login']);
    } 
    
    if(isLogin && this.authService.isLogged()) {
      this.router.navigate(['home']);
    }

    if(this.roles) {
      let data = this.authService.hasPermission(this.roles);
      if(data) {
        return true;
      } else {
        this.router.navigate(['home']);
        return false;
      }
    } else {
      return true;
    }
  }
}