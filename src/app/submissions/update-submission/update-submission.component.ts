import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubmissionService } from 'src/app/_services/submission.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute , Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Submission } from 'src/app/_models/submission.model';


@Component({
  selector: 'app-update-submission',
  templateUrl: './update-submission.component.html',
  styleUrls: ['./update-submission.component.scss']
})
export class UpdateSubmissionComponent implements OnInit {

  users: any[] = [];
  myFiles:string [] = [];
  public Editor = ClassicEditor;
  submissionForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  submission: Submission = new Submission();

  constructor(
    private submissionService: SubmissionService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getUsers();
    const submission_id = +this.route.snapshot.paramMap.get("id");
    this.submissionService.find(submission_id).then(
      data => {
        this.submission = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('Submission.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
      }
    )

  }

  initForm(withSubmission = false) {
    if (withSubmission) {
      this.submissionForm = this.formBuilder.group({
        user_send_id: ['', Validators.required],
        dest_user_id: ['', Validators.required],
        subject: [''],
        message: ['', Validators.required],
        file: ['']
      });
    } else {
      this.submissionForm = this.formBuilder.group({
          user_send_id: ['', Validators.required],
          dest_user_id: ['', Validators.required],
          subject: [''],
          message: ['', Validators.required],
          file: ['']
      });
    }
  }

  get form() {
    return this.submissionForm.controls;
  }

  getUsers() {
    this.submissionService.users().then(
      response => {
        this.users = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Aucune utilisateur trouvé");
      }
    )
  }

  detectFile(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
      }
  }
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.submissionForm.invalid) {
      this.translate.get('Assignment.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.form.user_send_id.value);
    formData.append('dest_user_id', '' + this.form.dest_user_id.value);
    formData.append('subject', '' + this.form.subject.value);
    formData.append('message', '' + this.form.message.value);
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("files[]", this.myFiles[i]);
    }
  
    this.submissionService.update(formData, this.submission.id)
      .then(resp => {
        this.translate.get('Submission.SubmitUpdateSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.submissionForm.reset();
        this.router.navigate(['/submissions/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Submission.' + err.error.code)
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}