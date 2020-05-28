import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { NotifService } from '../_services/notif.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const isLogin = route.data.isLoginRoute ? route.data.isLoginRoute : false;
    const permissions: string[] = route.data.permissions;

    if (isLogin && !this.authService.isAuthenticated()) {
      return true;
    }

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }

    if (isLogin && this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }

    if (permissions) {
      const hasPermission = this.authService.hasPermission(permissions);
      if (hasPermission) {
        return true;
      } else {
        this.translate.get('HTTP_ERROR_MSG.403').subscribe(val => this.notifService.warning(val));
        // this.router.navigate(['home']);
        return false;
      }
    } else {
      return true;
    }
  }
}
