import { Component, OnInit } from '@angular/core';
import { VacationTypeService } from 'src/app/_services/vacation-type.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { VacationType } from 'src/app/_models/vacation-type.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-vacation-type',
  templateUrl: './update-vacation-type.component.html',
  styleUrls: ['./update-vacation-type.component.scss']
})
export class UpdateVacationTypeComponent implements OnInit {

  vacationTypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  vacation_type_name = '';
  vacation: VacationType = new VacationType();


  constructor(
    private vacationTypeService: VacationTypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const id = +this.route.snapshot.paramMap.get("id");

    this.vacationTypeService.find(id)
      .then(
        data => {
          this.vacation = data;
          //this.vacation.slug="";
          this.initForm(true);
        }
      ).catch(
        error => {
          this.translate.get('VacationType.' + error.error.code)
            .subscribe(val => this.notifService.danger(val));
          this.router.navigate([''])
        }
      )

  }

  initForm(withVacation = false) {
    if (withVacation) {
      this.vacationTypeForm = this.formBuilder.group({
        label: [this.vacation.name, [Validators.required]],
        name: [this.vacation.slug, [Validators.required]],
        description: [this.vacation.description],
        days: [this.vacation.days, [Validators.min(1)]],
      });
    } else {
      this.vacationTypeForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        label: ['', [Validators.required]],
        description: [''],
        days: ['', Validators.min(1)]
      });
    }
  }

  get form() {
    return this.vacationTypeForm.controls;
  }

  computeName(event) {
    this.vacation_type_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.vacation_type_name);
    if (this.vacationTypeForm.invalid) {
      this.translate.get('VacationType.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('days', '' + this.form.days.value);
    this.vacationTypeService.update(formData, this.vacation.id)
      .then(resp => {
        this.translate.get('VacationType.UpdateSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.vacationTypeForm.reset();
        this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('VacationType.' + err.error.code)
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}