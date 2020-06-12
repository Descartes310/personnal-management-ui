import { Component, OnInit } from '@angular/core';
import { AssignmentType } from 'src/app/_models/assignmenttype.model';
import { AssignmentTypeService } from 'src/app/_services/assignmenttype.service';
import { NotifService } from 'src/app/_services/notif.service';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-all-assignmenttype',
  templateUrl: './all-assignmenttype.component.html',
  styleUrls: ['./all-assignmenttype.component.scss']
})
export class AllAssignmenttypeComponent implements OnInit {

  assignmenttypes: AssignmentType[] = [];
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
    private assignmenttypeService: AssignmentTypeService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSureAssigmenttype', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
        { data: '' })
        .subscribe(val => {
          this.areYouSure = val['SweetAlert.AreYouSureAssigmenttype'];
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
    this.getAssignmenttypes();
    const permissionSuffix = 'assignment-types';
    this.canCreate = this.authService.hasPermission(`create-${permissionSuffix}`);
    this.canUpdate = this.authService.hasPermission(`update-${permissionSuffix}`);
    this.canDelete = this.authService.hasPermission(`delete-${permissionSuffix}`);
  }

  getAssignmenttypes() {
    this.loading = true;
    this.assignmenttypeService.all().then(
      response => {
        this.assignmenttypes = [];
        response.map( assignmenttype => {
          this.assignmenttypes.push(new AssignmentType(assignmenttype));
        });
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    );
  }

  editAssignmenttype(assignmenttype: AssignmentType) {
    this.router.navigate(['assignment-types/update/' + assignmenttype.id]);
  }

  detailsAssignmenttype(assignmenttype: AssignmentType) {
    this.router.navigate(['/assignmenttype/details/' + assignmenttype.id]);
  }

  deleteAssignmenttype(assignmenttype: AssignmentType) {
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
        this.assignmenttypeService.delete(assignmenttype.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            );
            this.getAssignmenttypes();
          }
        ).catch(
          error => {
            this.blockUI.stop();
            this.translate.get('Assignmenttype.' + error.error.code)
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

