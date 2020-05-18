import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { License } from 'src/app/_models/license.model';
import { LicenseService } from 'src/app/_services/license.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.scss']
})
export class UpdateLicenseComponent implements OnInit {

  license_types: any[] = [];
  license_types_tmp: any[] = [];
  
  user;
  licenseForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  license : License = new License();
  file:File=null;

  constructor(
    private licenseService: LicenseService,
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
    this.getLicense_Type();
    const license_id = +this.route.snapshot.paramMap.get("id");
    this.licenseService.find(license_id).then(
      data => {
        this.license = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('License.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/roles/all'])
      }
    )

  }

  initForm(withLicense = false) {
    if(withLicense) {
      this.licenseForm = this.formBuilder.group({
        user_id: [this.license.user_id, [Validators.required]],
        license_type_id: [this.license.license_type_id, [Validators.required]],
        reason:[this.license.raison],
        description: [this.license.description],
        file:[this.license.file],
        requested_start_date:[this.license.requested_start_date,[Validators.required]],
        requested_days:[this.license.requested_days,[Validators.required]]

      });
    }else {
      this.licenseForm = this.formBuilder.group({
        license_type_id:['',[Validators.required]],
        reason:[''],
        description: [''],
        file:[''],
        requested_start_date:['',[Validators.required]],
        requested_days:['',[Validators.required]]
      });
    }
  }

  getLicense_Type() {
    this.licenseService.license_type().then(
      response => {
        this.license_types = response;
        this.license_types_tmp = response;
        console.log(response);
      }     
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
        console.log('erreur');
      }
    )
  }

  get form() {
    return this.licenseForm.controls;
  }

 
 
  onSubmit(){
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
      console.log(this.file);

      this.licenseService.update(formData, this.license.id)
      .then(resp => {
        this.translate.get('License.SubmitUpdateSuccess')
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
