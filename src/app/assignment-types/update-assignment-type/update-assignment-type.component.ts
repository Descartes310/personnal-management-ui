import { Component, OnInit } from '@angular/core';
import { AssignmentTypeService } from 'src/app/_services/assignment-type.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AssignmentType } from 'src/app/_models/assignment-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-assignment-type',
  templateUrl: './update-assignment-type.component.html',
  styleUrls: ['./update-assignment-type.component.scss']
})
export class UpdateAssignmentTypeComponent implements OnInit {

  assignmentTypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  assignment_type_name = '';
  assign: AssignmentType = new AssignmentType();


  constructor(
    private assignmentTypeService: AssignmentTypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const id = +this.route.snapshot.paramMap.get("id");
    
    this.assignmentTypeService.find(id)
    .then(
      data => {
        this.assign = data;
        //this.assign.slug="";
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('AssignmentType.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate([''])
      }
    )

  }

  initForm(withRole = false) {
    if(withRole) {
      this.assignmentTypeForm = this.formBuilder.group({
        name: [this.assign.name, [Validators.required]],
        label: [this.assign.slug, [Validators.required]],
        description: [this.assign.description]
      });
      this.assignment_type_name = this.assign.name;
    }else {
      this.assignmentTypeForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        label: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  get form() {
    return this.assignmentTypeForm.controls;
  }

  computeName(event){
    this.assignment_type_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.assignment_type_name);
    console.log(this.form.name.value)
    if (this.assignmentTypeForm.invalid) {
      this.translate.get('AssignmentType.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('slug', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    this.assignmentTypeService.update(formData, this.assign.id)
      .then(resp => {
        this.translate.get('AssignmentType.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.assignmentTypeForm.reset();
        this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('AssignmentType.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
