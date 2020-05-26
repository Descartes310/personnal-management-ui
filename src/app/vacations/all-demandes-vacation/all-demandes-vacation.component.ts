import { Component, OnInit } from '@angular/core';
import { Vacation } from 'src/app/_models/vacation.model';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-demandes-vacation',
  templateUrl: './all-demandes-vacation.component.html',
  styleUrls: ['./all-demandes-vacation.component.scss']
})
export class AllDemandesVacationComponent implements OnInit {
  vacations: Vacation[] = [];
  loading: Boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  roleForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  is_active=false;

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
          (vacation.status == "PENDING") ? this.vacations.push(new Vacation(vacation)): null;
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

  detailsRequest(vacation: Vacation) {
    this.router.navigate(['/vacation/demandes/'+vacation.id]);
  }

}







