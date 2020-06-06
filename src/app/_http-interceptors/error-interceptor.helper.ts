import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { APIError } from '../_models/api-error.model';
import { NotifService } from '../_services/notif.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()

/**
 * @description Cette classe a pour role d'intercepter les erreurs lors des requetes (apres la reponse du serveur)
 * et de les afficher dans la console, c'est un filtre Angular
 * @author Descartes Fowo
 */
export class ErrorInterceptor implements HttpInterceptor {

  private static showMessage = true;
  private static showForbiddenMessage = true;

  constructor(
    private notifService: NotifService,
    private translate: TranslateService,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: false
    });
    return next.handle(request)
      .pipe(map((data: HttpResponse<any>) => {
        return data;
      }))
      .pipe(catchError((err) => {
        if (err && err.status === 401 && !request.url.includes('token')) {
            return this.logout();
        } else if (err && err.status === 403) {
          this.forbidden();
        }
        return this.errorToMessage(err);
      }));
  }

  forbidden() {
    if (ErrorInterceptor.showForbiddenMessage) {
      this.translate.get('HTTP_ERROR_MSG.403').subscribe(val => this.notifService.warning(val));
      ErrorInterceptor.showForbiddenMessage = false;
      setTimeout(() => ErrorInterceptor.showForbiddenMessage = true, 3000);
    }
  }

  logout(): any[] {
    if (ErrorInterceptor.showMessage) {
      this.translate.get('HTTP_ERROR_MSG.401').subscribe(val => {
        this.notifService.danger(val);
      });
    } else {
      ErrorInterceptor.showMessage = true;
    }
    this.authService.logout();
    return [];
  }

  errorToMessage(err): Observable<any> {
    const error: APIError = err.error;
    return throwError(error);
  }

}
