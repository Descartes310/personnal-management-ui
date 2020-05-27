import { Component, OnInit } from '@angular/core';
import { Licensetype } from 'src/app/_models/licensetype.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2'
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { VacationType } from 'src/app/_models/vacation-type.model';
import { VacationTypeService } from 'src/app/_services/vacation-type.service';


@Component({
  selector: 'app-all-vacationtypes',
  templateUrl: './all-vacationtypes.component.html',
  styleUrls: ['./all-vacationtypes.component.scss']
})
export class AllVacationTypeComponent implements OnInit {

  vacationtypes: VacationType[] = [];
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
    private vacationTypeService: VacationTypeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: 'type de conges' })
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
    this.getLicenseTypes();
  }

  computeDescription(description: string): string {
    return (description.length < 100)? description: (description.substr(0,100) + '...');
  }

  getLicenseTypes() {
    this.loading = true;
    this.vacationTypeService.all().then(
      response => {
        this.vacationtypes = response;
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

  editvacationtype(licensetype: VacationType) {
    this.router.navigate(['/vacation-types/update/'+licensetype.id])
  }

  deletevacationtype(vacationtype: VacationType) {
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
        this.vacationTypeService.delete(vacationtype.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getLicenseTypes();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Licensetypes.'+error.error.code)
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

  public computeDate(date1) {
    let date: any = new Date(date1);
    date = this.pad(date.getDate(), 2, '0') +'-'+this.pad(date.getMonth() + 1, 2, '0')+'-'+ date.getFullYear()+' at '+date.getHours()+':'+date.getMinutes();
    return date;
  }

  public pad(s, width, character) {
      return new Array(width - s.toString().length + 1).join(character) + s;
  }

}
