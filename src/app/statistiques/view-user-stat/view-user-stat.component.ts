import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { StatisticService } from 'src/app/_services/statistic.service';
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { ProSituation } from 'src/app/_models/pro_situation.model';
import { NotifService } from 'src/app/_services/notif.service';
import { Career } from 'src/app/_models/career.model';

@Component({
  selector: 'app-view-user-stat',
  templateUrl: './view-user-stat.component.html',
  styleUrls: ['./view-user-stat.component.scss']
})
export class ViewUserStatComponent implements OnInit {

  weights: number[] = [];
  effectiveDate: Label[] = [];
  labelProSituation: string[] = [];
  pro_situations: ProSituation[] = [];
  usersCareers: Career[] = [];
  loading: boolean = true;
  constructor(
    private statService: StatisticService,
    private prosituationService: ProSituationService,
    private notifiService: NotifService
  ) { }

 ngOnInit() {
    
    this.getuserCareers(2);
   
    //his.getWeightProSituation()
    console.log(this.weights)
    //this.lineChartLabels=this.getLabelSituationPro()
    const tab = [12, 25, 13, 29, 18, 36, 28];
    this.lineChartData = [
      { data: this.weights, label: 'Parcours Professionnel' }
    ];
    this.lineChartLabels = this.labelProSituation;

  }

  lineChartData: ChartDataSets[] = [

    { data: [85, 72, 78, 82, 75, 71], label: 'PARCOURS DE EMPLOYE' },

  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  getProsituations() {
    this.loading = true;
    this.prosituationService.all().then(
      response => {
        this.pro_situations = response;
        
      }
    ).catch(
      error => {
        console.log(error)
        this.notifiService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  getOneProSituation(pro_situation_id) {

    const proSituation: ProSituation = this.pro_situations.find(
      (ProSituationObject) => {
        return ProSituationObject.id == pro_situation_id;
      }
    )

    return proSituation;
  }
  
  //recuperation des careers de utilisateur
  getuserCareers(user_id: number) {
    this.getProsituations();
    this.statService.getDatasetUserCareer(user_id).then(
      response => {
        this.usersCareers = response;
        console.log(this.usersCareers)
        this.usersCareers.forEach(element => {
        this.effectiveDate.push(element.effective_date);
          //recuperation des situations pro
        const proSitu = this.getOneProSituation(element.pro_situation_id);
        this.pro_situations.push(proSitu);
        this.labelProSituation.push(proSitu.name)
        this.weights.push(proSitu.weight);
        });
      }
    ).catch(
      error => {
        console.log(error)
        this.notifiService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }


  getLabelSituationPro(): Label[] {
    const proSituationLabel: Label[] = [];
    for (var i = 0; i < this.pro_situations.length; i++) {
      proSituationLabel.push(this.pro_situations[i].name);
    }
    return proSituationLabel;
  }

  //recuperation de tout les poids classe par ordre croissant
  getWeightProSituation() {
    //const weights:number[]=[];

  }
 

}
