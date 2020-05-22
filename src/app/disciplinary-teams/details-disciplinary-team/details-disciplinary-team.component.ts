import { Component, OnInit } from '@angular/core';
import { DisciplinaryTeamService} from 'src/app/_services/disciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { DisciplinaryTeam } from 'src/app/_models/disciplinary-team.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-disciplinary-team',
  templateUrl: './details-disciplinary-team.component.html',
  styleUrls: ['./details-disciplinary-team.component.scss']
})
export class DetailsDisciplinaryTeamComponent implements OnInit {
  disciplinary:any;
  //disciplinaryteam: Disciplinary
  disciplinaryteams: DisciplinaryTeam[] = [];
  loading: boolean = true;
  constructor(
    private disciplinaryteamService : DisciplinaryTeamService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    const disciplinary_id = +this.route.snapshot.paramMap.get("id");
    this.getOneDisciplinary_Team(1);

  }

  getDisciplinaryTeams() {
    this.loading = true;
    this.disciplinaryteamService.getDisciplinaryTeamWithUsers().then(response => {
        this.disciplinaryteams= response;
        /*response.map( disciplinaryteam => {
          this.disciplinaryteams.push(new DisciplinaryTeam(disciplinaryteam));
        });*/
        console.log(response);
    }).catch(error => {
        this.notifService.danger(error.error.message)
    }).finally( () => {
        this.loading = false;
    });
  }
  //ecrire une methode 
  getOneDisciplinary_Team(id){
    this.disciplinary = this.disciplinaryteams.find(
      (disciplinaryObject)=>{
        return disciplinaryObject.id===id;
      }
    );
    console.log(this.disciplinary)
   // return disciplinary;
  }
}
