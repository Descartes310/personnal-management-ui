import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/_services/submission.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Submission } from 'src/app/_models/submission.model';

@Component({
  selector: 'app-details-submission',
  templateUrl: './details-submission.component.html',
  styleUrls: ['./details-submission.component.scss']
})
export class DetailsSubmissionComponent implements OnInit {
  submission: Submission = new Submission();
  constructor(
    private submissionService: SubmissionService,
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,) { }

    async ngOnInit() {
      const submission_id = +this.route.snapshot.paramMap.get("id");
      this.submissionService.find(submission_id).then(
        data => {
          this.submission = new Submission(data);
          console.log(data);
  
        }
      ).catch(
        error => {
          this.translate.get('Role.'+error.error.code)
          .subscribe(val => this.notifService.danger(val));
          this.router.navigate(['/submissions/all'])
        }
      )
  
    }

}
