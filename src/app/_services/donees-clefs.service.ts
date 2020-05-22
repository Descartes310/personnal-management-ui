import { Injectable } from '@angular/core';
import { VacationService } from './vacation.service';
import { HttpClient } from '@angular/common/http';
import * as Routes from '../Routes'; 
import { Vacation } from '../_models/vacation.model';

@Injectable({
  providedIn: 'root'
})
export class DoneesClefsService {

  constructor(
    private vacationSservice:VacationService,
    private http:HttpClient,
    
    
  ) { }

  //recuperation de tous les utilisateurs actuellement connecte

  getUsersAuth(){
    
  }
  getCongesAttente(){


   }
  getCongesStatus(status:string){
    return this.http.get<number>(`${Routes.VACATION}`+'/status/'+`${status}`).toPromise();

  }
  getSanctionsCour(){
    return this.http.get<number>(`${Routes.SANCTION}`+'/sanctions_day').toPromise()
  }
}
