import { Component, OnInit } from '@angular/core';
import { AssignmentTypeService } from 'src/app/_services/assignment-type.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-assignment-type',
  templateUrl: './add-assignment-type.component.html',
  styleUrls: ['./add-assignment-type.component.scss']
})
export class AddAssignmentTypeComponent implements OnInit {

  

  assignmentTypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  role_name = '';

  constructor(
    private assignmentTypeServie: AssignmentTypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.assignmentTypeForm = this.formBuilder.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  get form() {
    return this.assignmentTypeForm.controls;
  }

  computeName(event){
    this.role_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }


  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.role_name);
    if (this.assignmentTypeForm.invalid) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('slug', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    
    this.assignmentTypeServie.add(formData)
      .then(resp => {
        this.translate.get('AssignmentType.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.assignmentTypeForm.reset();
      })
      .catch(err => {
        this.translate.get('AssignmentType.ASSIGNMENT_SLUG_ALREADY_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }


}
