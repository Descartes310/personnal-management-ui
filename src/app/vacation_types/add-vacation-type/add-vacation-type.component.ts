import { Component, OnInit } from '@angular/core';
import { VacationTypeService } from 'src/app/_services/vacation-type.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-vacation-type',
  templateUrl: './add-vacation-type.component.html',
  styleUrls: ['./add-vacation-type.component.scss']
})
export class AddVacationTypeComponent implements OnInit {

  

  vacationTypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  vacation_name = '';

  constructor(
    private vacationTypeServie: VacationTypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.vacationTypeForm = this.formBuilder.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      days:['', Validators.min(1)]
    });
  }

  get form() {
    return this.vacationTypeForm.controls;
  }

  computeName(event){
    this.vacation_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }


  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.vacation_name);
    if (this.vacationTypeForm.invalid) {
      this.translate.get('VacationType.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    console.log(this.form)
    formData.append('name', '' + this.form.label.value);
    formData.append('slug', '' + this.form.name.value);
    formData.append('days', '' + this.form.days.value);
    formData.append('description', '' + this.form.description.value);
    
    this.vacationTypeServie.add(formData)
      .then(resp => {
        this.translate.get('VacationType.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.vacationTypeForm.reset();
      })
      .catch(err => {
        this.translate.get('VacationType.VACATION_TYPE_ALREADY_EXISTS')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }


}