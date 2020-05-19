import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile.model';
import { UserService } from 'src/app/_services/user.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

	public personnalInfoForm: FormGroup;
	public publicInfoForm: FormGroup;
	public isOptional: boolean = false;
  public formInputList: any[] = [];
  public firstStepInputList:any[] = []; 
  public secondStepInputList:any[] = []; 
  public loading: boolean = false;
  public isBuild: boolean = false;
  public isSubmitted: boolean = false;

  constructor(
  	private formBuilder: FormBuilder,
    private userService: UserService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router
  ) 
  { }

  ngOnInit() {

    this.initPersonnalInfoForm();
  	this.initPubicInfoForm();
    this.getFormInput();

  }

  get personnalInfo() {
    return this.personnalInfoForm.controls;
  }

  get publicInfo() {
    return this.publicInfoForm.controls;
  }

  public getFormInput() {

    this.loading = true;
    this.userService.allProfiles().then(
      response => {
        this.formInputList = [];
        response.map( input => {
          this.formInputList.push(new Profile(input));
        });
        this.getInputListPerStep();
        this.initPersonnalInfoForm(true);
        this.initPubicInfoForm(true);
        console.log(this.personnalInfoForm, this.publicInfoForm);
        this.isBuild = true;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingError')
          .subscribe(val => this.notifService.danger(val));
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )

  }

  public initPersonnalInfoForm(withProfile = false): void {

    if(withProfile) {
      let parametter: any = {}; 

      this.firstStepInputList.map(input => {
        let validationRules: any[] = [];

        if(input.is_required) {
          validationRules.push(Validators.required);
        } 
        
        if(input.min) {
          validationRules.push(Validators.min(input.min));
        } 

        if(input.max) {
          validationRules.push(Validators.max(input.max));
        }
       
        parametter[input.name] = [
          input.default,
          validationRules
        ];

      })
      this.personnalInfoForm = this.formBuilder.group(parametter);
    } else {
      this.personnalInfoForm = this.formBuilder.group({});
    }

  }

  public initPubicInfoForm(withProfile = false): void {

    if(withProfile) {
      let parametter: any = {}; 
      
      this.secondStepInputList.map(input => {
        let validationRules: any[] = [];

        if(input.is_required) {
          validationRules.push(Validators.required);
        } 
        
        if(input.min) {
          validationRules.push(Validators.min(input.min));
        } 

        if(input.max) {
          validationRules.push(Validators.max(input.max));
        }

        parametter[input.name] = [
          input.default,
          validationRules
        ];

      })
      this.publicInfoForm = this.formBuilder.group(parametter);
    } else {
      this.publicInfoForm = this.formBuilder.group({});
    }
      
  }

  public getInputListPerStep() {
    this.firstStepInputList = this.formInputList.filter(input => input.is_private);
    this.secondStepInputList = this.formInputList.filter(input => !input.is_private);
  }

  public checkIfInputIsASelect(input: Profile): boolean {
    return (input.type === 'select');
  }

  public checkIfSelected(input: Profile, option: any) {
    return (option.value === input.default);
  }

  public checkIfInputIsAFile(input) {
    
  }

  public validatePersonnalInfoForm() {

    this.isSubmitted = true;
    if(this.personnalInfoForm.invalid) {
      this.translate.get('User.SubmitError')
      .subscribe(val => this.notifService.danger(val));
    } else {
      this.isSubmitted = false;
    }
  }

  public validatePublicInfoForm() {

    this.isSubmitted = true;
    if(this.publicInfoForm.invalid) {
      this.translate.get('User.SubmitError')
      .subscribe(val => this.notifService.danger(val));
    } else {
      this.isSubmitted = false;
    }
  }

}
