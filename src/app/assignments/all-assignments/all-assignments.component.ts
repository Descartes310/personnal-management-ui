import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment.model';
import Swal from 'sweetalert2';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-assignments',
  templateUrl: './all-assignments.component.html',
  styleUrls: ['./all-assignments.component.scss']
})
export class AllAssignmentsComponent implements OnInit {

  assignments: Assignment[] = [];
  user: any[];
  assignmentType: any[];
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
    private assignmentService: AssignmentService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

    this.translate.get(
      ['SweetAlert.AreYouSureAssignment', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'assignment' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSureAssignment'];
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
    this.assignments = [];
    this.getAssignments();
    const permissionSuffix = 'assignments';
    this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
    this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
    this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  async getAssignments() {
    this.loading = true;
    this.assignmentService.all().then(
      response => {
        console.log(response)
        // this.assignments = response
        this.assignments = [];
        response.map(assignment => {
          this.assignments.push(new Assignment(assignment));
        });
        console.log(this.assignments);
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
            )
            this.ngOnInit();
          }
        ).catch(
          error => {
            console.log(error);
            this.blockUI.stop();
            this.translate.get('Assignments' + error.error.code)
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
