import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Vacation } from 'src/app/_models/vacation.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  isLoadingcancel = false;
  isLoadingrefuse = false;
  isLoadingvalide = false;
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
        requested_days: [this.vacation.requested_days, [Validators.required]],
        created_at: [this.vacation.created_at, [Validators.required]],
      });
    }else {
      this.vacationForm = this.formBuilder.group({
        raison: [''],
        description: [''],
        requested_start_date: ['', [Validators.required]],
        requested_days: ['', [Validators.required]],
        created_at: [''],
      });
    }
  }

  get form() {
    return this.vacationForm.controls;
  }

  
  
  cancelRequest() {
 
    this.isError = false;
    this.isSuccess = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');

    if (this.vacation.requested_days <= 0) {
      this.translate.get('Form.DaysError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if (!this.form.requested_days.value || currentDate >= this.form.requested_days.value) {
      this.translate.get('Form.DateError')
        .subscribe(val => this.notifService.danger(val));
      this.isLoading = false;
      return;
    }
    
    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.vacation.user_id);
    formData.append('vacation_type_id', '' + this.vacation.vacation_type_id);
    formData.append('raison', '' + this.vacation.raison);
    formData.append('description', '' + this.vacation.description);
    formData.append('requested_start_date', '' + this.vacation.requested_start_date);
    formData.append('requested_days', '' + this.vacation.requested_days);
    formData.append('status', 'CANCELLED' );
    this.vacationService.update(formData, this.vacation.id)
      .then(resp => {
        this.translate.get('Demande_V.CancelVacationNotif')
        .subscribe(val => this.notifService.success(val));
       
        this.router.navigate(['/vacation/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
    

  valideRequest() {

    this.isError = false;
    this.isSuccess = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');

    if (this.vacation.requested_days <= 0) {
      this.translate.get('Form.FreeDaysError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if ( !this.form.requested_days.value || currentDate >= this.form.requested_days.value) {
      this.translate.get('Form.DateError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading =true;
    const formData = new FormData();
    formData.append('user_id', '' + this.vacation.user_id);
    formData.append('vacation_type_id', '' + this.vacation.vacation_type_id);
    formData.append('raison', '' + this.vacation.raison);
    formData.append('description', '' + this.vacation.description);
    formData.append('requested_start_date', '' + this.vacation.requested_start_date);
    formData.append('accorded_start_date', '' + this.form.requested_start_date.value);
    formData.append('requested_days', '' + this.vacation.requested_days);
    formData.append('accorded_days', '' + this.form.requested_days.value);
    formData.append('status', 'APPROVED' );
    this.vacationService.update(formData, this.vacation.id)
      .then(resp => {
        this.translate.get('Demande_V.AcceptVacationNotif')
        .subscribe(val => this.notifService.success(val));
       
        this.router.navigate(['/vacation/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  refuseRequest() {
    this.isError = false;
    this.isSuccess = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');

    if (this.vacation.requested_days <= 0) {
      this.translate.get('Form.DaysError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if (!this.form.requested_days.value || currentDate >= this.form.requested_days.value) {
      this.translate.get('Form.DateError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.vacation.user_id);
    formData.append('vacation_type_id', '' + this.vacation.vacation_type_id);
    formData.append('raison', '' + this.vacation.raison);
    formData.append('description', '' + this.vacation.description);
    formData.append('requested_start_date', '' + this.vacation.requested_start_date);
    formData.append('requested_days', '' + this.vacation.requested_days);
    formData.append('status', 'REJECTED' );
    this.vacationService.update(formData, this.vacation.id)
      .then(resp => {
        this.translate.get('Demande_V.RefuseVacationNotif')
        .subscribe(val => this.notifService.success(val));
        
        this.router.navigate(['/vacation/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}



