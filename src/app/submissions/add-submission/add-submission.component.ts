import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubmissionService } from 'src/app/_services/submission.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-submission',
  templateUrl: './add-submission.component.html',
  styleUrls: ['./add-submission.component.scss']
})
export class AddSubmissionComponent implements OnInit {
  
  users: any[] = [];
  myFiles:string [] = [];
  public Editor = ClassicEditor;
  submissionForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  constructor(
    private submissionService: SubmissionService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers();

    this.submissionForm = this.formBuilder.group({
      //user_send_id: ['', Validators.required],
      dest_user_id: ['', Validators.required],
      subject: [''],
      message: ['', Validators.required],
      file: ['']
    })
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
      this.translate.get('Submission.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.authService.getUser().id);
    formData.append('dest_user_id', '' + this.form.dest_user_id.value);
    formData.append('subject', '' + this.form.subject.value);
    formData.append('message', '' + this.form.message.value);
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("files[]", this.myFiles[i]);
    }
  
    this.submissionService.add(formData)
      .then(resp => {
        console.log(resp);
        this.translate.get('Submission.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.submissionForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Submission.SubmitError')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
