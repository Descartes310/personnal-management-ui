import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { StatisticService } from '../_services/statistic.service';
import { Router } from '@angular/router';
import { DoneesClefsService } from '../_services/donees-clefs.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  listOfMonth: string[] = [];
  listofAssignmentnumber: number[] = [];
  listOfAssignment: any[] = [];
  //variable du petit tableau de droite
  nbVacationPending: number;
  nbVacationApproved: number;
  nbSanctionPending: number;
  nbAllUsers: number;
  //tableau associatif
  tabGraph: any[] = [
    { month: "nothing", total: 0 }
  ]
  constructor(
    private authService: AuthService,
    private statistiqueServive: StatisticService,
    private doneeclefService: DoneesClefsService,
    private userService: UserService,
    private router: Router
  ) {
    this.lineChartData = [
      { data: this.listofAssignmentnumber, label: "Nombre de demande de Conge par mois" }
    ];
    this.lineChartLabels = this.listOfMonth;
  }

  lineChartData: ChartDataSets[] = [{
    data: [{ x: 15, y: 15, r: 15 },
    { x: 25, y: 15, r: 25 },
    { x: 36, y: 12, r: 33 },
    { x: 10, y: 18, r: 18 }], label: 'DEMANDE DE CONGE PAR MOIS'
  }];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getAssignmentByMonth();
    this.getSanctionCour();
    this.getVacationApproved()
    this.getcountUsers();
    this.getVacationCour();
  }


  //recuperation des affectations groupes par mois
  getAssignmentByMonth() {
    this.statistiqueServive.getAssignmentByMonth().then(
      response => {
        this.listOfAssignment = response;
        this.tabGraph = [];
        for (const key in this.listOfAssignment) {
          if (this.listOfAssignment.hasOwnProperty(key)) {
            this.listofAssignmentnumber.push(this.listOfAssignment[key].length);
            this.listOfMonth.push(this.getLabelOfMonth(key));
            this.tabGraph.push({ month: this.getLabelOfMonth(key), total: this.listOfAssignment[key].length });

          }
        }
        //tri du tableau associatif par ordre croissant du nombre total de permissiont
        this.tabGraph.sort((a, b) => a.total - b.total)
       
      }
    )
    console.log(this.listOfMonth)
  }

  getLabelOfMonth(month: string) {
    switch (month) {
      case '01': return 'Jan';
      case '02': return 'Fev';
      case '03': return 'Mar';
      case '04': return 'Avr';
      case '05': return 'Mai';
      case '06': return 'Juin';
      case '07': return 'Juil';
      case '08': return 'Aout';
      case '09': return 'Sept';
      case '10': return 'Oct';
      case '11': return 'Nov';
      case '12': return 'Dec';
    }
  }

  public initUser() {
    let user_tmp = this.authService.getUser();
    if(user_tmp)
      this.user = user_tmp;
  }

  //fonction pour la gestion des valeurs clef de la page accueil

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
        this.nbAllUsers = listUsers.length;
      }
    ).catch(
      error => {
        console.error(error)
      }
    )

  }


  listSantion() {
    this.router.navigate(['/vacations/all'])
  }

  //
  getMaxNumberAndMaxMonth(listOfMonth) {
    const a = listOfMonth.slice().sort()
    console.log(a)
  }
}
