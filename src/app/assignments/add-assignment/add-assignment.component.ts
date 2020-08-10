import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  pipe = new DatePipe('en-US');
  Date = new Date();
  currentDate = this.pipe.transform(this.Date, 'yyyy-MM-dd');
  type_assignment: any[] = [];
  users: any[] = [];
  cities: any[] = [];

  assignmentForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  constructor(
    private assignmentService: AssignmentService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getTypeAssignment();
    this.getCities();
   
    this.assignmentForm = this.formBuilder.group({
      user_assignment : ['', Validators.required],
      type_assignment : ['', Validators.required],
      destination :  ['', Validators.required],
      signature_date : ['', Validators.required],
      installation_date : ['',  Validators.required],
      raison: ['', Validators.required],
      description: ['']
    })
  }

  get form(){
    return this.assignmentForm.controls;
  }

  getTypeAssignment() {
    this.assignmentService.typeAssignment().then(
      response => {
        this.type_assignment = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }
  getUsers() {
    this.assignmentService.users().then(
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
  getCities(){
    this.assignmentService.cities().then(
      response => {
        this.cities = response;
      }
    ).catch(
      error => {
        this.notifService.danger("aucune ville existante");
      }
    )
  }
  
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;

  
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.assignmentForm.invalid) {
      this.translate.get('Assignment.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.form.user_assignment.value);
    formData.append('assignment_type_id', '' + this.form.type_assignment.value);
    formData.append('destination', '' + this.form.destination.value);
    if (this.currentDate > this.form.signature_date.value) {
      this.translate.get('Form.StartDateError1')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
    }else{
      formData.append('signature_date', '' + this.form.signature_date.value);
    }
    if (this.form.signature_date.value >= this.form.installation_date.value ) {
      this.translate.get('Form.StartDateError2')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
    }else{
      formData.append('installation_date', '' + this.form.installation_date.value);
    }
    formData.append('raison', '' + this.form.raison.value);
    formData.append('description', '' + this.form.description.value);
   
    this.assignmentService.add(formData)
      .then(resp => {
        this.translate.get('Assignment.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.assignmentForm.reset();
      })
      .catch(err => {
        this.translate.get('Assignment.SendError')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
