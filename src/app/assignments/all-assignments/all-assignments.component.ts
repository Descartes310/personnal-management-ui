import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment.model';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-all-assignments',
  templateUrl: './all-assignments.component.html',
  styleUrls: ['./all-assignments.component.scss']
})
export class AllAssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
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


  constructor(
    private assignmentService: AssignmentService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'assignment' })
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
    this.getAssignments();
  }

  async getAssignments() {
    this.loading = true;
    this.assignmentService.all().then(resp => this.assignments = resp)
    .catch(error => this.notifService.danger(error.error.message))
    .finally(() => this.loading = false);
  }

  editAssignment(assignment: Assignment) {
    this.router.navigate(['/assignments/update/' + assignment.id]);
  }

  detailsAssignment(assignment: Assignment) {
    this.router.navigate(['/assignments/details/' + assignment.id]);
  }

  deleteAssignment(assignment: Assignment) {
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
        this.assignmentService.delete(assignment.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getAssignments();
          }
        ).catch(
          error => {
            console.log(error);
            this.blockUI.stop();
            this.translate.get('Assignment.' + error.error.code)
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
