import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile.model';
import { UserService } from 'src/app/_services/user.service';
import { RoleService } from 'src/app/_services/role.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public formInputList: any[] = [];
  public firstStepInputList:any[] = []; 
  public secondStepInputList:any[] = []; 
  public permissions: any[] = [];
  public permissions_tmp: any[] = [];
  public selected_permissions: number[] = [];
  public roles: any[] = [];
  public roles_tmp: any[] = [];
  public selected_roles: number[] = [];

	public personnalInfoForm: FormGroup;
  public publicInfoForm: FormGroup;
  public roleAndPermissionsForm: FormGroup;
  
	public isOptional: boolean = false;
  public loading: boolean = false;
  public isBuild: boolean = false;
  public isSubmitted: boolean = false;

  public data: FormData = new FormData();

  public data_tmp1: any = {};
  public data_tmp2: any = {};
  public errorMessages: any = {};

  public loginMinLength: number = 6;
  public passwordMinLength: number = 6;
  

  constructor(
  	private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
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

  get login() {
    return this.personnalInfoForm.get('login');
  };

  get password() {
    return this.personnalInfoForm.get('password');
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
        this.initRoleAndPermissionsForm();
        this.getRoles();
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

  getPermissions() {
    this.roleService.permissions().then(
      response => {
        this.permissions = response;
        this.permissions_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  getRoles() {
    this.roleService.all().then(
      response => {
        this.roles = response.data;
        this.roles_tmp = response.data;
        this.getPermissions();
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }


  public initPersonnalInfoForm(withProfile = false): void {

    if(withProfile) {
      
      this.initErrorMessages();
      this.getLoginErrorMessages();
      this.getPasswordErrorMessages();

      let parametter: any = {}; 

      parametter['login'] = [
        '',
        [
          Validators.required,
          Validators.minLength(this.loginMinLength)
        ]
      ];

      parametter['password'] = [
        '',
        [
          Validators.required,
          Validators.minLength(this.passwordMinLength)
        ]
      ];

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
       
        parametter[input.slug] = [
          input.default,
          validationRules
        ];

      })
      this.personnalInfoForm = this.formBuilder.group(parametter);
    } else {
      this.personnalInfoForm = this.formBuilder.group({});
    }

  }

  public initErrorMessages() {

    this.errorMessages = {
      login: [
        { type: 'required', message: '' },
        { type: 'minlength', message: '' }
      ],
      password: [
        { type: 'required', message: '' },
        { type: 'minlength', message: '' }
      ]
    }

  }

  public getLoginErrorMessages() {
    this.translate.get('User.ErrorMessages.Login', { data: this.loginMinLength + '' }).subscribe(val => {
    this.errorMessages.login[0].message = val[0];
    this.errorMessages.login[1].message = val[1];
    });
  }

  public  getPasswordErrorMessages() {
    this.translate.get('User.ErrorMessages.Password', { data: this.passwordMinLength + '' }).subscribe(val => {
    this.errorMessages.password[0].message = val[0];
    this.errorMessages.password[1].message = val[1];
    });
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

        parametter[input.slug] = [
          input.default,
          validationRules
        ];

      })
      this.publicInfoForm = this.formBuilder.group(parametter);
    } else {
      this.publicInfoForm = this.formBuilder.group({});
    }
      
  }

  public initRoleAndPermissionsForm() {
    this.roleAndPermissionsForm = this.formBuilder.group({});
  }

  public getInputListPerStep() {
    this.firstStepInputList = this.formInputList.filter(input => input.is_private);
    this.secondStepInputList = this.formInputList.filter(input => !input.is_private);
  }

  public checkIfInputIsASelect(input: Profile): boolean {
    return (input.type === 'select');
  }

  public checkIfInputIsAText(input: Profile): boolean {
    return (input.type === 'text');
  }

  public checkIfInputIsANumber(input: Profile): boolean {
    return (input.type === 'number');
  }

  public checkIfInputIsAFile(input: Profile): boolean {
    return (input.type === 'file');
  }

  public checkIfHasOderType(input: Profile): boolean {
    return (input.type !== 'file' && input.type !== 'select' && input.type !== 'number' && input.type !== 'text');
  }

  public checkIfSelected(input: Profile, option: any) {
    return (option.value === input.default);
  }

  public checkInputNumberFisrtForm(event, input: Profile) {
    let value = parseInt(event.target.value);
    if (input.min) {

      if(value < input.min) {
        this.personnalInfo[input.slug].setValue(input.min);
      }

    } else if(input.max) {

      if(value > input.max) {
        this.personnalInfo[input.slug].setValue(input.max);
      }

    }
  }

  public checkInputNumberSecondForm(event, input: Profile) {
    let value = parseInt(event.target.value);
    if (input.min) {

      if(value < input.min) {
        this.publicInfo[input.slug].setValue(input.min);
      }

    } else if(input.max) {

      if(value > input.max) {
        this.publicInfo[input.slug].setValue(input.max);
      }

    }
  }

  public processFile1(event, inputSlug) {
    let file: File = event.target.files[0];
    this.data.append(inputSlug, file);
    this.data_tmp1[inputSlug] = file;
  }

  public processFile2(event, inputSlug) {
    let file: File = event.target.files[0];
    this.data.append(inputSlug, file);
    this.data_tmp2[inputSlug] = file;
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

  public computeDataToSend() {
    Object.keys(this.personnalInfo).map(key => {
      if(this.data_tmp1[key]) {
        this.data.append(key, this.data_tmp1[key]);
      } else {
        this.data.append(key, this.personnalInfo[key].value);
        this.data_tmp1[key] = this.personnalInfo[key].value;
      }
    });

    Object.keys(this.publicInfo).map(key => {
      if(this.data_tmp2[key]) {
        this.data.append(key, this.data_tmp2[key]);
      } else {
        this.data.append(key, this.publicInfo[key].value);
        this.data_tmp2[key] = this.publicInfo[key].value;
      }
    });
    console.log(this.data_tmp1, this.data_tmp2);
  }

  public onSubmit() {
    this.computeDataToSend();

    this.loading = true
    this.userService.add(this.data).then(
      response => {
        console.log(response);
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('User.CreateUserError')
          .subscribe(val => this.notifService.danger(val));
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )

  }

  selectAllPermission(event: any){
    this.selected_permissions = [];
    if(event.target.checked) {
      this.permissions_tmp.map(
        permission => {
          this.selected_permissions.push(permission.id)
        }
      )
    }
  }

  selectAllRole(event: any){
    this.selected_roles = [];
    if(event.target.checked) {
      this.roles_tmp.map(
        role => {
          this.selected_roles.push(role.id)
        }
      )
    }
  }

  searchRole(event) {
    this.roles = this.roles_tmp;
    this.roles = this.roles_tmp.filter( role => role.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  searchPermission(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  onCheckedRole(role, event){
    if(event.target.checked) {
      this.selected_roles.push(role.id);
    } else {
      this.selected_roles.splice(this.selected_roles.indexOf(role.id), 1);
    }
  }

  onCheckedPermission(permission, event){
    if(event.target.checked) {
      this.selected_permissions.push(permission.id);
    } else {
      this.selected_permissions.splice(this.selected_permissions.indexOf(permission.id), 1);
    }
  }

  isChecked(id: number){
    return this.selected_permissions.includes(id);
  }

}
