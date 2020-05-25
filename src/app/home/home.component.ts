import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DoneesClefsService } from '../_services/donees-clefs.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  nbVacationPending: number = 0;
  nbVacationApproved: number = 0;
  nbSanctionPending: number = 0;
  nbAllUsers: number = 0;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private doneeclefService: DoneesClefsService,
    private router:Router
  ) { }

  ngOnInit() {
    this.initUser();
    this.getSanctionCour();
    this.getVacationApproved()
    this.getcountUsers();
    this.getVacationCour();

  }

  public initUser() {
    let user_tmp = this.authService.getUser();
    if(user_tmp)
      this.user = user_tmp;
  }

  getVacationCour() {
    this.doneeclefService.getCongesStatus("PENDING").then(
      response => {
        console.log("nb de conge en cour:" + response)
        this.nbVacationPending = response;
      }
    ).catch(
      error => {
        console.error(error)
      }
    )
    

  }
  getVacationApproved() {
    this.doneeclefService.getCongesStatus("APPROVED").then(
      response => {
        console.log("nb de conge en cour:" + response)
        this.nbVacationApproved = response;
      }
    ).catch(
      error => {
        console.error(error)
      }
    )
    

  }
  getSanctionCour() {
    this.doneeclefService.getSanctionsCour().then(
      response => {
        console.log("nb de conge en cour:" + response)
        this.nbSanctionPending = response;
      }
    ).catch(
      error => {
        console.error(error)
      }
    )
    

  }

  getcountUsers() {
    this.userService.all().then(
      response => {
        const listUsers: User[] = response;
        this.nbAllUsers=listUsers.length;
      }
    ).catch(
      error => {
        console.error(error)
      }
    )

  }
 

  listSantion(){
    this.router.navigate(['/vacations/all'])
  }
  
}
