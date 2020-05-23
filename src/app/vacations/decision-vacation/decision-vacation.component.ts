import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Vacation } from 'src/app/_models/vacation.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-decision-vacation',
  templateUrl: './decision-vacation.component.html',
  styleUrls: ['./decision-vacation.component.scss']
})
export class DecisionVacationComponent implements OnInit {

  
  vacationForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  vacation: Vacation = new Vacation();

  constructor(
    private vacationService: VacationService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const vacation_id = +this.route.snapshot.paramMap.get("id");
    this.vacationService.find(vacation_id).then(
      data => {
        this.vacation = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('Vacation.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/vacations/all'])
      }
    )

  }

  
  initForm(withVacation = false) {
    if(withVacation) {
      console.log(this.vacation)
      this.vacationForm = this.formBuilder.group({
        raison: [this.vacation.raison],
        description: [this.vacation.description],
        requested_start_date: [this.vacation.requested_start_date, [Validators.required]],
        accorded_start_date: [this.vacation.accorded_start_date],
        requested_days: [this.vacation.requested_days, [Validators.required]],
        accorded_days: [this.vacation.accorded_days],
        created_at: [this.vacation.created_at, [Validators.required]],
      });
    }else {
      this.vacationForm = this.formBuilder.group({
        raison: [''],
        description: [''],
        requested_start_date: ['', [Validators.required]],
        accorded_start_date: [''],
        requested_days: ['', [Validators.required]],
        accorded_days: [''],
        created_at: [''],
      });
    }
  }

  get form() {
    return this.vacationForm.controls;
  }

  
  
  cancelRequest(vacation: Vacation) {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    
    // Si la validation a echoué, on arrete l'execution de la fonction

    if (!vacation) {
      this.translate.get('Vacation.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    const formData = new FormData();
    formData.append('user_id', '' + vacation.user_id);
    formData.append('vacation_type_id', '' + vacation.vacation_type_id);
    formData.append('raison', '' + vacation.raison);
    formData.append('description', '' + vacation.description);
    formData.append('requested_start_date', '' + vacation.requested_start_date);
    formData.append('accorded_start_date', '' + vacation.accorded_start_date);
    formData.append('requested_days', '' + vacation.requested_days);
    formData.append('accorded_days', '' + vacation.accorded_days);
    formData.append('status', 'CANCELLED' );
    this.vacationService.update(formData, vacation.id)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.router.navigate(['/vacation/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
    

  valideRequest(vacation: Vacation) {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction

    if (!vacation) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    const formData = new FormData();
    formData.append('user_id', '' + vacation.user_id);
    formData.append('vacation_type_id', '' + vacation.vacation_type_id);
    formData.append('raison', '' + vacation.raison);
    formData.append('description', '' + vacation.description);
    formData.append('requested_start_date', '' + vacation.requested_start_date);
    formData.append('accorded_start_date', '' + vacation.accorded_start_date);
    formData.append('requested_days', '' + vacation.requested_days);
    formData.append('accorded_days', '' + vacation.accorded_days);
    formData.append('status', 'APPROVED' );
    this.vacationService.update(formData, vacation.id)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.router.navigate(['/vacation/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  refuseRequest(vacation: Vacation) {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction

    if (!vacation) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    const formData = new FormData();
    formData.append('user_id', '' + vacation.user_id);
    formData.append('vacation_type_id', '' + vacation.vacation_type_id);
    formData.append('raison', '' + vacation.raison);
    formData.append('description', '' + vacation.description);
    formData.append('requested_start_date', '' + vacation.requested_start_date);
    formData.append('accorded_start_date', '' + vacation.accorded_start_date);
    formData.append('requested_days', '' + vacation.requested_days);
    formData.append('accorded_days', '' + vacation.accorded_days);
    formData.append('status', 'REJECTED' );
    this.vacationService.update(formData, vacation.id)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.router.navigate(['/vacation/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }


  // onSubmit() {
  //   this.isSubmitted = true;
  //   this.isError = false;
  //   this.isSuccess = false;
  //   this.isLoading = false
  //   // Si la validation a echoué, on arrete l'execution de la fonction
  //   if (this.vacationForm.invalid) {
  //     this.translate.get('Vacation.SubmitError')
  //       .subscribe(val => this.notifService.danger(val));
  //     return;
  //   }


  //   this.isLoading = true;
  //   const formData = new FormData();
  //   formData.append('display_name', '' + this.form.label.value);
  //   formData.append('name', '' + this.form.name.value);
  //   formData.append('description', '' + this.form.description.value);
  //   this.vacationService.update(formData, this.vacation.id)
  //     .then(resp => {
  //       this.translate.get('Vacation.SubmitSuccess')
  //       .subscribe(val => this.notifService.success(val));
  //       this.isSubmitted = false;
  //       this.router.navigate(['/vacations/all']);
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       this.translate.get('Vacation.'+err.error.code)
  //       .subscribe(val => this.notifService.danger(val));
  //     })
  //     .finally(() => this.isLoading = false);
  // }

}



