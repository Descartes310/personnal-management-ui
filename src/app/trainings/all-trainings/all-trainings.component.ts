import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { TrainingService } from 'src/app/_services/training.service';
import { Training } from 'src/app/_models/training.model';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-trainings',
  templateUrl: './all-trainings.component.html',
  styleUrls: ['./all-trainings.component.scss']
})
export class AllTrainingsComponent implements OnInit {

  trainings: Training[] = [];
  loading = true;
  @BlockUI() blockUI: NgBlockUI;

  // SweetAlert Text
  areYouSure = '';
  warning = '';
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  canCreate = false;
  canUpdate = false;
  canDelete = false;

  constructor(
    private authService: AuthService,
    private trainingService: TrainingService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
      'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'Training' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSure'];
        this.warning = val['SweetAlert.Warning'];
        this.yes = val['SweetAlert.Yes'];
        this.no = val['SweetAlert.No'];
        this.deleted = val['SweetAlert.Deleted'];
        this.deletedMessage = val['SweetAlert.DeletedMessagePro'];
        this.cancelled = val['SweetAlert.Cancelled'];
        this.cancelledMessage = val['SweetAlert.CancelledMessage'];
      });
   }

  ngOnInit() {
    this.getTrainings();
    const permissionSuffix = 'trainings';
    this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
    this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
    this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getTrainings() {
    this.loading = true;
    this.trainingService.all().then(
      response => {
        this.trainings = [];
        this.trainings = response;
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

  editTrainings(training: Training) {
    this.router.navigate(['/trainings/update/' + training.id]);
  }

  detailsTrainings(training: Training) {
    this.router.navigate(['/trainings/details/' + training.id]);
  }

  deleteTrainings(training: Training) {
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
        this.trainingService.delete(training.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getTrainings();
          }
        ).catch(
          error => {
            this.blockUI.stop();
            this.translate.get('Training.' + error.error.code)
            .subscribe(val => this.notifService.danger(val));
          }
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        );
      }
    });
  }
}
