import { Component, OnInit } from '@angular/core';
import { DisciplinaryTeam } from 'src/app/_models/disciplinary-team.model';
import { DisciplinaryTeamService } from 'src/app/_services/disciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-disciplinary-teams',
  templateUrl: './all-disciplinary-teams.component.html',
  styleUrls: ['./all-disciplinary-teams.component.scss']
})
export class AllDisciplinaryTeamsComponent implements OnInit {

  disciplinaryteams: DisciplinaryTeam[] = [];
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  constructor(
    private disciplinaryteamService : DisciplinaryTeamService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router,
  ) { 

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
      { data: 'disciplinaryteam' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSure'];
        this.warning = val['SweetAlert.Warning'];
        this.yes = val['SweetAlert.Yes'];
        this.no = val['SweetAlert.No'];
        this.deleted = val['SweetAlert.Deleted'];
        this.deletedMessage = val['SweetAlert.DeletedMessage'];
        this.cancelled = val['SweetAlert.Cancelled'];
        this.cancelledMessage = val['SweetAlert.CancelledMessage'];
      });
  }

  ngOnInit() {
    this.getDisciplinaryTeams();
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

  editDisciplinaryTeam(disciplinaryteam: DisciplinaryTeam) {
    this.router.navigate(['/disciplinary-teams/update/'+disciplinaryteam.id])
  }

  detailsDisciplinaryTeam(disciplinaryteam: DisciplinaryTeam) {
    this.router.navigate(['/disciplinary-teams/details/'+disciplinaryteam.id])
  }

  deleteDisciplinaryTeam(disciplinaryteam: DisciplinaryTeam) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }
    ).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.disciplinaryteamService.delete(disciplinaryteam.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getDisciplinaryTeams();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Disciplinaryteam.'+error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        )
      }
    })
  }

}
