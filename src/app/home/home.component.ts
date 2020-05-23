import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
<<<<<<< HEAD
=======
import { DoneesClefsService } from '../_services/donees-clefs.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
<<<<<<< HEAD

  constructor(
    private authService: AuthService
=======
  nbVacationPending: number;
  nbVacationApproved: number;
  nbSanctionPending: number;
  nbAllUsers: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private doneeclefService: DoneesClefsService,
    private router:Router
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
<<<<<<< HEAD
  }

  alert() {
    alert('Bonjour le monde')
  }
=======
    this.getSanctionCour();
    this.getVacationApproved()
    this.getcountUsers();
    this.getVacationCour();

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
  
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}
