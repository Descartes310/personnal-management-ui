import { Component, OnInit } from '@angular/core';
import { VacationService } from 'src/app/_services/vacation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.scss']
})
export class AddVacationComponent implements OnInit {

  vacation_types: any[] = [];
  vacation_types_tmp: any[] = [];

  
  user;
  vacationForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  file:File=null;

  constructor(
    private vacationService: VacationService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService:AuthService,
    private router: Router,
  ) {
    
   }

  ngOnInit() {
    this.getVacation_Type();
    this.user = this.authService.getUser();

    this.vacationForm = this.formBuilder.group({
      vacation_type_id:['',[Validators.required]],
      raison:[''],
      description: [''],
      requested_start_date:['',[Validators.required]],
      requested_days:['',[Validators.required]],
      file:['']
      
    });

  }

  get form() {
    return this.vacationForm.controls;
  }

  getVacation_Type() {
    this.vacationService.vacation_type().then(
      response => {
        this.vacation_types = response;
        this.vacation_types_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  onSelectfile(event){
    this.file=event.target.files[0];
  }
  
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
   
    if (this.vacationForm.invalid) {
      this.translate.get('Vacation.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('vacation_type_id', ''+this.form.vacation_type_id.value);
    formData.append('raison', '' + this.form.raison.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('requested_start_date', '' + this.form.requested_start_date.value);
    formData.append('requested_days', '' + this.form.requested_days.value);
    formData.append('is_active', '1');
    formData.append('status', 'PENDING');
    if(this.file != null)
      formData.append('file',this.file,this.file.name);

      this.vacationService.add(formData)
      .then(resp => {
        this.translate.get('Vacation.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.vacationForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.SubmitErrorVacation')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}