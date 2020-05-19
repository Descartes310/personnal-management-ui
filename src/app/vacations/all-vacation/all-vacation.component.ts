import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/_models/vacation.model';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-vacation',
  templateUrl: './all-vacation.component.html',
  styleUrls: ['./all-vacation.component.scss']
})
export class AllVacationComponent implements OnInit {

  vacations: Vacation[] = [];
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
    private vacationService: VacationService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'vacation' })
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
    this.getVacations();
  }

  getVacations() {
    this.loading = true;
    this.vacationService.all().then(
      response => {
        this.vacations = [];
        response.map( vacation => {
          this.vacations.push(new Vacation(vacation));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  editVacation(vacation: Vacation) {
    this.router.navigate(['/vacations/update/'+vacation.id])
  }

  detailsVacation(vacation: Vacation) {
    this.router.navigate(['/vacations/details/'+vacation.id])
  }

  deleteVacation(vacation: Vacation) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.vacationService.delete(vacation.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getVacations();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Vacation.'+error.error.code)
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
