import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/_services/submission.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Submission } from 'src/app/_models/submission.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-submissions',
  templateUrl: './all-submissions.component.html',
  styleUrls: ['./all-submissions.component.scss']
})
export class AllSubmissionsComponent implements OnInit {

  submissions: any[] = [];
  submissions_tmp: any[] = [];
  user_id: number = 0;
  isMine: boolean = false;
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
    private authService: AuthService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router)
   {
    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'courriel' })
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
    this.user_id = this.authService.getUser().id;
    this.getSubmissions();
  }

  getSubmissions() {
    this.submissionService.all().then(
      data => {
        this.submissions = data;
        this.submissions_tmp = data;
        console.log(data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )
  }

  imSender(submission: any) {
    return submission.user_id == this.user_id;
  }

  showMySubmission(value){
    this.submissions = [];
    if(value) {
      this.submissions_tmp.map( submission => {
        this.imSender(submission) ? this.submissions.push(submission) : null;
      })
    } else {
      this.submissions_tmp.map( submission => {
        !this.imSender(submission) ? this.submissions.push(submission) : null;
      })
    }
  }

  getDate(data): string{
    let date: any = new Date(data);
    date = this.pad(date.getDate(), 2, '0') +'-'+this.pad(date.getMonth() + 1, 2, '0')+'-'+ date.getFullYear();
    return date;
  }

  computeDescription(text: string): string {
    return (text.length < 100)? text: (text.substr(0,100) + '...');
  }

  computeSubject(text: string): string {
    return (text.length < 20)? text: (text.substr(0,20) + '...');
  }

  pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  detailsSubmission(submission: Submission) {
    this.router.navigate(['/submissions/details/', +submission.id]);
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
            this.translate.get('Submission.' + error.error.code)
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
