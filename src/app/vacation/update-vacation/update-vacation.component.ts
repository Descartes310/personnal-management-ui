import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vacation } from 'src/app/_models/vacation.model';
import { VacationService } from 'src/app/_services/vacation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-update-vacation',
  templateUrl: './update-vacation.component.html',
  styleUrls: ['./update-vacation.component.scss']
})
export class UpdateVacationComponent implements OnInit {

  vacation_types: any[] = [];
  vacation_types_tmp: any[] = [];
  
  user;
  vacationForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  file:File=null;
  vacation : Vacation = new Vacation();

  constructor(
    private vacationService: VacationService,
    private authService:AuthService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
    this.initForm();
    this.getVacation_Type();
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
/**
 * @author jiozangtheophane@gmail.com
 * @param withVacation 
 */
  initForm(withVacation = false) {

    if(withVacation) {
      if(this.vacation.raison != "null" && this.vacation.description != "null"){
        this.vacationForm = this.formBuilder.group({
          user_id: [this.vacation.user_id, [Validators.required]],
          vacation_type_id: [this.vacation.vacation_type_id, [Validators.required]],  
          raison:[this.vacation.raison],
          description: [this.vacation.description],
          file:[],
          requested_start_date:[this.vacation.requested_start_date,[Validators.required]],
          requested_days:[this.vacation.requested_days,[Validators.required]]

        });
      }else {
        this.vacationForm = this.formBuilder.group({
          user_id: [this.vacation.user_id, [Validators.required]],
          vacation_type_id: [this.vacation.vacation_type_id, [Validators.required]],  
          raison:[''],
          description: [''],
          file:[],
          requested_start_date:[this.vacation.requested_start_date,[Validators.required]],
          requested_days:[this.vacation.requested_days,[Validators.required]]

        });
      }
    }else {
      this.vacationForm = this.formBuilder.group({
        vacation_type_id:['',[Validators.required]],
        raison:[''],
        description: [''],
        requested_start_date:['',[Validators.required]],
        requested_days:['',[Validators.required]],
        file:['']
      });
    }
  }

  getVacation_Type() {
    /*this.vacationService.vacation_type().then(
      response => {
        this.vacation_types = response;
        this.vacation_types_tmp = response;
        console.log(response);
      }     
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
        console.log('erreur');
      }
    )*/
  }

  get form() {
    return this.vacationForm.controls;
  }

  onSelectfile(event){
    this.file=event.target.files[0];
  }

  onSubmit(){
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
      
      this.vacationService.update(formData, this.vacation.id)
      .then(resp => {
        this.translate.get('Vacation.SubmitUpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.vacationForm.reset();
        this.router.navigate(['/vacations/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Vacation.SubmitErrorVacation')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
  
}