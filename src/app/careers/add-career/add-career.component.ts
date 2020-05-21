import { Component, OnInit } from '@angular/core';
import { CareersService } from 'src/app/_services/careers.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Careers } from 'src/app/_models/careers.model';

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.scss']
})
export class AddCareerComponent implements OnInit {

  users: any[] = [];
  users_tmp: any[] = [];

  pro_situations: any[] = [];
  pro_situations_tmp: any[] = [];
  
  user;  
  careersForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
 

  constructor(
    private careersService: CareersService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService:AuthService,
    private router: Router,
  ) {
    
   }

  ngOnInit() {
    this.getUsers();
    this.getPro_situations();
  
    this.careersForm = this.formBuilder.group({
      user_id:['',[Validators.required]],
      pro_situation_id:['',[Validators.required]],
      effective_date:[''],      
    });

  }

  get form() {
    return this.careersForm.controls;
  }

  getUsers() {
    this.careersService.users().then(
      response => {
        this.users = response;
        this.users_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  getPro_situations() {
    this.careersService.pro_situations().then(
      response => {
        this.pro_situations = response;
        this.pro_situations_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }


  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
   
    if (this.careersForm.invalid) {
      this.translate.get('Career.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', ''+this.form.user_id.value);
    formData.append('pro_situation_id', '' + this.form.pro_situation_id.value);
    formData.append('effective_date', ''+this.form.effective_date.value);

      this.careersService.add(formData)
      .then(resp => {
        this.translate.get('Career.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.careersForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Career.SubmitErrorCareer')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
