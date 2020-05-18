import { Component, OnInit } from '@angular/core';
import { LicenseService } from 'src/app/_services/license.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss']
})
export class AddLicenseComponent implements OnInit {

  license_types: any[] = [];
  license_types_tmp: any[] = [];
  user;
  licenseForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  file:File=null;

  constructor(
    private licenseService: LicenseService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private authService:AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getLicense_Type();
    this.user = this.authService.getUser();
    this.licenseForm = this.formBuilder.group({
      license_type_id:['',[Validators.required]],
      reason:[''],
      description: [''],
      file:[''],
      requested_start_date:['',[Validators.required]],
      requested_days:['',[Validators.required]]
      
    });

  }

  get form() {
    return this.licenseForm.controls;
  }

  getLicense_Type() {
    this.licenseService.license_type().then(
      response => {
        this.license_types = response;
        this.license_types_tmp = response;
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
   
    if (this.licenseForm.invalid) {
      this.translate.get('License.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', this.user.id);
    formData.append('license_type_id', ''+this.form.license_type_id.value);
    formData.append('raison', '' + this.form.reason.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('requested_start_date', '' + this.form.requested_start_date.value);
    formData.append('requested_days', '' + this.form.requested_days.value);
    formData.append('is_active', '1');
    formData.append('status', 'PENDING');
    if(this.file != null)
      formData.append('file',this.file,this.file.name);

      this.licenseService.add(formData)
      .then(resp => {
        this.translate.get('License.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.licenseForm.reset();
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('License.LICENSE_VALIDATOR')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  detectfile(event){
    this.file=event.target.files[0];
  }

}
