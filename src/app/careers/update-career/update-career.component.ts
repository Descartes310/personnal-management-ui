import { Component, OnInit } from '@angular/core';
import { CareersService } from 'src/app/_services/careers.services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Careers } from 'src/app/_models/careers.model';

@Component({
  selector: 'app-update-career',
  templateUrl: './update-career.component.html',
  styleUrls: ['./update-career.component.scss']
})
export class UpdateCareerComponent implements OnInit {


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
  career : Careers = new Careers();

  constructor(
    private careersService: CareersService,
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
    this.getUsers();
    this.getPro_situations();

    const careers_id = +this.route.snapshot.paramMap.get("id");
    this.careersService.find(careers_id).then(
      data => {
        this.career = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('Career.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/careers/all'])
      }
    )
  }
/**
 * @author jiozangtheophane@gmail.com
 * @param withVacation 
 */
  initForm(withVacation = false) {

    if(withVacation) {
       this.careersForm = this.formBuilder.group({
          user_id: [this.career.user_id, [Validators.required]],
          pro_situation_id: [this.career.pro_situation_id, [Validators.required]],  
          effective_date:[this.career.effective_date,[Validators.required]]

        });
    }else {
      this.careersForm = this.formBuilder.group({
        user_id:['',[Validators.required]],
        pro_situation_id:['',[Validators.required]],
        effective_date:[''],
        
      });
    }
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

  get form() {
    return this.careersForm.controls;
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
   
      this.careersService.update(formData, this.career.id)
      .then(resp => {
        this.translate.get('Career.SubmitUpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.careersForm.reset();
        this.router.navigate(['/careers/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Career.SubmitErrorCareer')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
