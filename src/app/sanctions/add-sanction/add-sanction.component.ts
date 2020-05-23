import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SanctionService } from 'src/app/_services/sanction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-sanction',
  templateUrl: './add-sanction.component.html',
  styleUrls: ['./add-sanction.component.scss']
})
export class AddSanctionComponent implements OnInit {

  users = [];
  pipe = new DatePipe('en-US');
  Date = new Date();
  currentDate = this.pipe.transform(this.Date, 'yyyy-MM-dd');
  sanctionForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  constructor(
    private sanctionService: SanctionService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.sanctionForm = this.formBuilder.group({
      user_sanction : ['', Validators.required],
      subject : [''],
      raison : [''],
      decision : [''],
      start_date : [''],
      days : ['']
    })
  }

  get form() {
    return this.sanctionForm.controls;
  }
  getUsers() {
    this.sanctionService.users().then(
      response => {
        console.log(response);
        response.map(user => {
          this.users.push(user);
        });
      }
    ).catch(
      error => {
        this.notifService.danger("Aucun utilisateur existant");
      }
    )
  }
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.sanctionForm.invalid) {
      this.translate.get('Sanction.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    formData.append('subject', '' + this.form.subject.value);
    formData.append('raison', '' + this.form.raison.value);
    formData.append('decision', '' + this.form.decision.value);
    if (this.currentDate >= this.form.start_date.value || this.form.days.value <= 0) {
      this.translate.get('Form.StartDateError')
        .subscribe(val => this.notifService.danger(val));
      this.translate.get('Form.DaysError')
        .subscribe(val => this.notifService.danger(val));
    }
    formData.append('start_date', '' + this.form.start_date.value);
    formData.append('days', '' + this.form.days.value);

    this.sanctionService.add(formData)
      .then(resp => {
        console.log(resp);
        this.translate.get('Sanction.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.sanctionForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Sanction.SubmitError')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
