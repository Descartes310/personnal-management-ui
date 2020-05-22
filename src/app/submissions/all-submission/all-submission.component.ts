import { Component, OnInit } from '@angular/core';
import { Submission } from 'src/app/_models/submission.model';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SubmissionService } from 'src/app/_services/submission.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-submission',
  templateUrl: './all-submission.component.html',
  styleUrls: ['./all-submission.component.scss']
})
export class AllSubmissionComponent implements OnInit {
  submissions: Submission[] = [];
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
  cancelledMessage = ''

  constructor(
    private submissionService: SubmissionService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router) {

      this.translate.get(
        ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'], 
        { data: 'submission' })
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
    this.getSubmissions();
  }

  getSubmissions() {
    this.loading = true;
    this.submissionService.all().then(
      response => {
        this.submissions = [];
        console.log(response);
        response.map( submission => {
          this.submissions.push(new Submission(submission));
        });
        console.log(this.submissions);
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

  editSubmission(submission: Submission) {
    this.router.navigate(['/submissions/update/'+submission.id])
  }

  detailsSubmission(submission: Submission) {
    this.router.navigate(['/submissions/details/'+submission.id])
  }

  deleteSubmission(submission: Submission) {
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
        this.submissionService.delete(submission.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getSubmissions();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Submission.'+error.error.code)
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

