import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { APIError } from '../_models/api-error.model';
import { NotifService } from '../_services/notif.service';

@Injectable()

/**
 * @description Cette classe a pour role d'intercepter les erreurs lors des requetes (apres la reponse du serveur)
 * et de les afficher dans la console, c'est un filtre Angular
 * @author Descartes Fowo
 */
export class ErrorInterceptor implements HttpInterceptor {

  private static showMessage = true;

  constructor(
    private notifService: NotifService,
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
        } else {
          return this.errorToMessage(err);
        }
      }));
  }

  logout(): any[] {
    if (ErrorInterceptor.showMessage) {
      this.notifService.danger('Votre session est arrivée à expiration !');
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
