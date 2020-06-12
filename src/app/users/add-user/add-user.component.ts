import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile.model';
import { UserService } from 'src/app/_services/user.service';
import { RoleService } from 'src/app/_services/role.service';
import { DivisionService } from 'src/app/_services/division.service';
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Division } from 'src/app/_models/division.model';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
 */
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  formInputList: any[] = [];
  firstStepInputList: any[] = [];
  secondStepInputList: any[] = [];
  permissions: any[] = [];
  permissions_tmp: any[] = [];
  selected_permissions: number[] = [];
  roles: any[] = [];
  roles_tmp: any[] = [];
  selected_roles: number[] = [];
  cities: any[] = [];
  divisions: any[] = [];
  proSituations: any[] = [];
  public files: any = [];

  personnalInfoForm: FormGroup;
  publicInfoForm: FormGroup;
  roleAndPermissionsForm: FormGroup;

  isOptional = false;
  loading = false;
  isBuild = false;
  isSubmitted = false;
  loadingPermissions = false;
  loadingRoles = false;

  data: FormData = new FormData();

  data_tmp1: any = {};
  data_tmp2: any = {};
  errorMessages: any = {};

  loginMinLength = 6;
  passwordMinLength = 6;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private divisionService: DivisionService,
    private proSituationService: ProSituationService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router
  ){}

  ngOnInit() {
    this.initPersonnalInfoForm();
    this.initPubicInfoForm();
    this.getFormInput();
  }

  get login() {
    return this.personnalInfoForm.get('login');
  }

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
        response.map(input => {
          this.formInputList.push(new Profile(input));
        });
        this.getInputListPerStep();
        this.initPersonnalInfoForm(true);
        this.initPubicInfoForm(true);
        this.initRoleAndPermissionsForm();
        this.initCities();
        this.getDivision();
        this.isBuild = true;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingFormError').subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/users/all']);
      }
    ).finally(() => {
      this.getRoles();
    });
  }

  public getPermissions() {
    this.loadingPermissions = true;
    this.roleService.permissions().then(
      response => {
        this.permissions = response;
        this.permissions_tmp = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingFormError').subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/users/all']);
      }
    ).finally(() => {
      this.loadingPermissions = false;
    });
  }

  public getRoles() {
    this.loadingRoles = true;
    this.roleService.getRolesWithPermissions().then(
      response => {
        this.roles = response;
        this.roles_tmp = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingFormError')
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/users/all']);
      }
    ).finally(() => {
      this.loadingRoles = false;
      this.getPermissions();
    });
  }

  public getDivision() {
    this.divisionService.all().then(
      response => {
        this.divisions = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingError')
          .subscribe(val => this.notifService.danger(val));
      }
    );
  }


  public initPersonnalInfoForm(withProfile = false): void {

    if (withProfile) {

      this.initErrorMessages();
      this.getLoginErrorMessages();
      this.getPasswordErrorMessages();

      const parametter: any = {};

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

      parametter['city'] = [
        '',
        [
          Validators.required,
        ]
      ];

      this.firstStepInputList.map(input => {
        const validationRules: any[] = [];

        if (input.is_required) {
          validationRules.push(Validators.required);
        }

        if (input.min) {
          validationRules.push(Validators.min(input.min));
        }

        if (input.max) {
          validationRules.push(Validators.max(input.max));
        }

        if (input.type === 'file') {
          parametter[input.slug] = [
            null,
            validationRules
          ];
        } else {
          parametter[input.slug] = [
            input.default,
            validationRules
          ];
        }

      });
      this.personnalInfoForm = this.formBuilder.group(parametter);
    } else {
      this.personnalInfoForm = this.formBuilder.group({});
    }

  }

  public initCities() {

    this.userService.cities().then(
      response => {
        this.cities = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingFormError')
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/users/all']);
      }
    ).finally(
      () => {
        this.initProSituations();
      }
    );

  }

  public initProSituations() {

    this.proSituationService.all().then(
      response => {
        this.proSituations = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingFormError')
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/users/all']);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    );

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
    };

  }

  public getLoginErrorMessages() {
    this.translate.get('User.ErrorMessages.Login', { data: this.loginMinLength }).subscribe(val => {
      this.errorMessages.login[0].message = val[0];
      this.errorMessages.login[1].message = val[1];
    });
  }

  public  getPasswordErrorMessages() {
    this.translate.get('User.ErrorMessages.Password', { data: this.passwordMinLength }).subscribe(val => {
      this.errorMessages.password[0].message = val[0];
      this.errorMessages.password[1].message = val[1];
    });
  }

  public initPubicInfoForm(withProfile = false): void {

    if (withProfile) {
      const parametter: any = {};

      parametter['pro_situation'] = [
        '',
        [
          Validators.required,
        ]
      ];

      parametter['division_id'] = [
        '',
        [
          Validators.required,
        ]
      ];

      this.secondStepInputList.map(input => {
        const validationRules: any[] = [];

        if (input.is_required) {
          validationRules.push(Validators.required);
        }

        if (input.min) {
          validationRules.push(Validators.min(input.min));
        }

        if (input.max) {
          validationRules.push(Validators.max(input.max));
        }

        if (input.type === 'file') {
          parametter[input.slug] = [
            null,
            validationRules
          ];
        } else {
          parametter[input.slug] = [
            input.default,
            validationRules
          ];
        }

      });
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
    const value = parseInt(event.target.value);
    if (input.min) {

      if (value < input.min) {
        this.personnalInfo[input.slug].setValue(input.min);
        this.translate.get('User.InputMinError', { data1: input.name, data2: input.min })
          .subscribe(val => this.notifService.danger(val));
        return;
      }

    }

    if (input.max) {

      if (value > input.max) {
        this.personnalInfo[input.slug].setValue(input.max);
        this.translate.get('User.InputMaxError', { data1: input.name, data2: input.max })
          .subscribe(val => this.notifService.danger(val));
        return;
      }

    }
  }

  public checkInputNumberSecondForm(event, input: Profile) {
    const value = parseInt(event.target.value);
    if (input.min) {

      if (value < input.min) {
        this.publicInfo[input.slug].setValue(input.min);
        this.translate.get('User.InputMinError', { data1: input.name, data2: input.min })
          .subscribe(val => this.notifService.danger(val));
        return;
      }

    }

    if (input.max) {

      if (value > input.max) {
        this.publicInfo[input.slug].setValue(input.max);
        this.translate.get('User.InputMaxError', { data1: input.name, data2: input.max })
          .subscribe(val => this.notifService.danger(val));
        return;
      }

    }
  }

  public processFile1(event, inputSlug) {

    if(this.files.length > 0)
      this.removeFileIfExist(event.target.files[0], inputSlug);

    const file: File = event.target.files[0];

    this.files.push({
      slug: inputSlug,
      file: event.target.files[0]
    })
    
    this.data_tmp1[inputSlug] = file;
    console.log(this.data_tmp1);

  }

  public processFile2(event, inputSlug) {

    if(this.files.length > 0)
      this.removeFileIfExist(event.target.files[0], inputSlug);

    const file: File = event.target.files[0];

    this.files.push({
      slug: inputSlug,
      file: event.target.files[0]
    })

    this.data_tmp2[inputSlug] = file;
    console.log(this.data_tmp2);

  }

  public removeFileIfExist(file: File, slug) {
 
    let tmp = {
      slug: slug,
      file: file
    };

    let files_tmp = this.files;
    this.files = [];
    let file_tmp: any[] = this.files.map(file => {
      if(file.slug !== tmp.slug && file.file !== tmp.file)
        this.files.push(tmp);
    });
  }

  public validatePersonnalInfoForm() {

    this.isSubmitted = true;

    const login: string = this.personnalInfo.login.value;
    const password: string = this.personnalInfo.password.value;
    const ville: string = this.personnalInfo.city.value;

    this.firstStepInputList.map(input => {

      let value;
      if (this.personnalInfo[input.slug]) {
        value = this.personnalInfo[input.slug].value;
      } else {
        return;
      }


      if (input.is_required) {
        if (!value) {
          this.translate.get('User.InputRequiredError', { data: input.name })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }

      if (input.minlength) {
        if (value.length < input.minlength) {
          this.translate.get('User.InputMinLengthError', { data1: input.name, data2: input.minlength })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }

      if (input.maxlength) {
        if (value.length > input.maxlength) {
          this.translate.get('User.InputMaxLengthError', { data1: input.name, data2: input.maxlength })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }

      if (input.max || input.min) {
        value = parseInt(value);

        if (value !== NaN) {

          if (value > input.max) {
            this.translate.get('User.InputMaxError', { data1: input.name, data2: input.max })
              .subscribe(val => this.notifService.danger(val));
            return;
          }
          if (value < input.min) {
            this.translate.get('User.InputMinError', { data1: input.name, data2: input.max })
              .subscribe(val => this.notifService.danger(val));
            return;
          }
        } else {
          this.translate.get('User.InputNaNError', { data: input.name })
            .subscribe(val => this.notifService.danger(val));
        }
      }


    });

    if (!login) {
      this.translate.get('User.InputRequiredError', { data: 'login' })
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if (login.length < this.loginMinLength) {
      this.translate.get('User.InputMinLengthError', { data1: 'login', data2: this.loginMinLength })
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if (!password) {
      this.translate.get('User.InputRequiredError', { data: 'password' })
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if (password.length < this.passwordMinLength) {
      this.translate.get('User.InputMinLengthError', { data1: 'password', data2: this.passwordMinLength })
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if (!ville) {
      this.translate.get('User.InputRequiredError', { data: 'ville' })
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if (this.personnalInfoForm.valid) {
      this.isSubmitted = false;
    }

  }

  public validatePublicInfoForm() {

    this.isSubmitted = true;

    const proSituation: string = this.publicInfo.pro_situation.value;

    this.secondStepInputList.map(input => {

      let value;
      if (this.publicInfoForm[input.slug]) {
        value = this.publicInfoForm[input.slug].value;
      } else {
        return;
      }


      if (input.is_required) {
        if (!value) {
          this.translate.get('User.InputRequiredError', { data: input.name })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }

      if (input.minlength) {
        if (value.length < input.minlength) {
          this.translate.get('User.InputMinLengthError', { data1: input.name, data2: input.minlength })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }

      if (input.maxlength) {
        if (value.length > input.maxlength) {
          this.translate.get('User.InputMaxLengthError', { data1: input.name, data2: input.maxlength })
            .subscribe(val => this.notifService.danger(val));
          return;
        }
      }


      if (input.max || input.min) {
        value = parseInt(value);

        if (value !== NaN) {

          if (value > input.max) {
            this.translate.get('User.InputMaxError', { data1: input.name, data2: input.max })
              .subscribe(val => this.notifService.danger(val));
            return;
          }
          if (value < input.min) {
            this.translate.get('User.InputMinError', { data1: input.name, data2: input.max })
              .subscribe(val => this.notifService.danger(val));
            return;
          }
        } else {
          this.translate.get('User.InputNaNError', { data: input.name })
            .subscribe(val => this.notifService.danger(val));
        }
      }


    });

    if (!proSituation) {
      this.translate.get('User.InputRequiredError', { data: 'situation professionnelle' })
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if (this.publicInfoForm.valid) {
      this.isSubmitted = false;
    }

  }

  public computeDataToSend() {

    Object.keys(this.personnalInfo).map(key => {

      let file_tmp = null;

      this.files.map(file => {
        if(file.slug === key) {
          file_tmp = file;
          console.log(file_tmp);
        }
      });

      if(file_tmp !== null) {
        console.log(file_tmp);
        this.data.append(key, file_tmp.file);
      } else {
        this.data.append(key, this.personnalInfo[key].value);
        this.data_tmp1[key] = this.personnalInfo[key].value;
      } 

    });

    Object.keys(this.publicInfo).map(key => {

      let file_tmp = null;

      this.files.map(file => {
        if(file.slug === key) {
          file_tmp = file;
        }
      });

      if(file_tmp !== null) {
        this.data.append(key, file_tmp.file);
      } else {
        this.data.append(key, this.publicInfo[key].value);
        this.data_tmp1[key] = this.publicInfo[key].value;
      }

    });

    this.selected_permissions.forEach( elt => {
      this.data.append('permissions[]', JSON.stringify(elt));
    });

    this.selected_roles.forEach( elt => {
      this.data.append('roles[]', JSON.stringify(elt));
    });
    this.data_tmp1.roles = this.selected_roles;
    this.data_tmp1.permissions = this.selected_permissions;

    const result: any = {};
    result.personnalInfo = this.data_tmp1;
    result.publicInfo = this.data_tmp2;
    console.log(result);

  }

  public onSubmit() {
    this.computeDataToSend();

    this.loading = true;
    this.userService.add(this.data).then(
      createdUser => {
        const rolesPermissions = {
          roles: JSON.stringify(this.selected_roles),
          permissions: JSON.stringify(this.selected_permissions)
        };
        this.roleService.syncUserAbilities(createdUser.id, rolesPermissions)
        .then(res => {
          console.log(res);
          this.translate.get('User.CreateUserSuccess')
          .subscribe(val => this.notifService.success(val));
          this.isSubmitted = false;
          this.personnalInfoForm.reset();
          this.publicInfoForm.reset();
          this.selected_permissions = [];
          this.selected_roles = [];
          document.getElementById('reset-btn').click();
          this.data = new FormData();
          this.data_tmp1 = {};
          this.data_tmp2 = {};
        })
        .catch(err => {
          console.log(err);
          this.translate.get('User.CreateUserError')
            .subscribe(val => this.notifService.danger(val));
        });
      }
    ).catch(
      error => {
        console.log(error);
        
        if (error.status && error.code) {
          if (error.status === '400' && error.code === 'VALIDATION_ERROR') {
            this.firstStepInputList.map(input => {
              if (error.errors[input.slug]) {
                error.errors[input.slug].map(errorMessage => {
                  this.notifService.danger(errorMessage);
                });
              }
            });
            this.secondStepInputList.map(input => {
              if (error.errors[input.slug]) {
                error.errors[input.slug].map(errorMessage => {
                  this.notifService.danger(errorMessage);
                });
              }
            });
            if (error.errors.login) {
              error.errors.login.map(errorMessage => {
                this.notifService.danger(errorMessage);
              });
            }
            if (error.errors.password) {
              error.errors.password.map(errorMessage => {
                this.notifService.danger(errorMessage);
              });
            }
          }
        }
        console.log(error);
        this.translate.get('User.CreateUserError')
          .subscribe(val => this.notifService.danger(val));
      }
    ).finally(
      () => {
        this.loading = false;
      }
    );

  }

  selectAllPermission(event: any) {
    this.selected_permissions = [];
    if (event.target.checked) {
      this.permissions_tmp.map(
        permission => {
          this.selected_permissions.push(permission.id);
        }
      );
    }
  }

  selectAllRole(event: any) {
    this.selected_roles = [];
    this.selected_permissions = [];
    if (event.target.checked) {
      this.roles_tmp.map(
        role => {
          this.selected_roles.push(role.id);
        }
      );
      this.permissions_tmp.map(
        permission => {
          this.selected_permissions.push(permission.id);
        }
      );
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

  onCheckedRole(role, event) {
    const permissions = role.permissions;

    if (event.target.checked) {

      this.selected_roles.push(role.id);
      permissions.map(permission => {
        if (!this.selected_permissions.includes(permission.id)) {
          this.selected_permissions.push(permission.id);
        }
      });

    } else {
      this.selected_roles.splice(this.selected_roles.indexOf(role.id), 1);
      permissions.map(permission => {
        this.selected_permissions.splice(this.selected_permissions.indexOf(permission.id), 1);
      });
    }

  }

  onCheckedPermission(permission, event) {
    if (event.target.checked) {
      if (!this.selected_permissions.includes(permission.id)) {
        this.selected_permissions.push(permission.id);
      }
    } else {
      this.selected_permissions.splice(this.selected_permissions.indexOf(permission.id), 1);
    }
  }

  isCheckedPermission(id: number) {
    return this.selected_permissions.includes(id);
  }

  isCheckedRole(id: number) {
    return this.selected_roles.includes(id);
  }

}
