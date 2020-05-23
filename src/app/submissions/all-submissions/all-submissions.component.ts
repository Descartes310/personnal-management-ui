import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/_services/submission.service';
import { AuthService } from 'src/app/_services/auth.service';

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

  constructor(
    private submissionService: SubmissionService,
    private authService: AuthService
  ) { }

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

}
