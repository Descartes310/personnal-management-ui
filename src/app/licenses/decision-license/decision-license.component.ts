import { Component, OnInit } from '@angular/core';
import { LicenseService } from 'src/app/_services/license.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { License } from 'src/app/_models/license.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-decision-license',
  templateUrl: './decision-license.component.html',
  styleUrls: ['./decision-license.component.scss']
})
export class DecisionLicenseComponent implements OnInit {
  
   
  licenseForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isLoadingcancel = false;
  isLoadingrefuse = false;
  isLoadingvalide = false;
  license: License = new License();

  constructor(
    private licenseService: LicenseService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
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
        this.router.navigate(['/licenses/all'])
      }
    )

  }

  
  initForm(withLicense = false) {
    if(withLicense) {
      console.log(this.license)
      this.licenseForm = this.formBuilder.group({
        raison: [this.license.raison],
        description: [this.license.description],
        requested_start_date: [this.license.requested_start_date, [Validators.required]],
        requested_days: [this.license.requested_days, [Validators.required]],
        created_at: [this.license.created_at, [Validators.required]],
      });
    }else {
      this.licenseForm = this.formBuilder.group({
        raison: [''],
        description: [''],
        requested_start_date: ['', [Validators.required]],
        requested_days: ['', [Validators.required]],
        created_at: [''],
      });
    }
  }

  get form() {
    return this.licenseForm.controls;
  }

  
  
  cancelRequest() {
 
    this.isError = false;
    this.isSuccess = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');

    if (this.license.requested_days <= 0) {
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
    formData.append('user_id', '' + this.license.user_id.id);
    formData.append('license_type_id', '' + this.license.license_type_id.id);
    formData.append('raison', '' + this.license.raison);
    formData.append('description', '' + this.license.description);
    formData.append('is_active', '' + 1);
    formData.append('requested_start_date', '' + this.license.requested_start_date);
    formData.append('requested_days', '' + this.license.requested_days);
    formData.append('status', 'CANCELLED' );
    this.licenseService.update(formData, this.license.id)
      .then(resp => {
        this.translate.get('Demande_L.CancelVacationNotif')
        .subscribe(val => this.notifService.success(val));
       
        this.router.navigate(['/license/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('License.'+err.error.code)
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

    if (this.license.requested_days <= 0) {
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
    formData.append('user_id', '' + this.license.user_id.id);
    formData.append('license_type_id', '' + this.license.license_type_id.id);
    formData.append('raison', '' + this.license.raison);
    formData.append('description', '' + this.license.description);
    formData.append('requested_start_date', '' + this.license.requested_start_date);
    formData.append('accorded_start_date', '' + this.form.requested_start_date.value);
    formData.append('requested_days', '' + this.license.requested_days);
    formData.append('is_active', '' + 1);
    formData.append('accorded_days', '' + this.form.requested_days.value);
    formData.append('status', 'APPROVED' );
    this.licenseService.update(formData, this.license.id)
      .then(resp => {
        this.translate.get('Demande_L.AcceptLicenseNotif')
        .subscribe(val => this.notifService.success(val));
       
        this.router.navigate(['/license/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('License.'+err.error.code)
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

    if (this.license.requested_days <= 0) {
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
    formData.append('user_id', '' + this.license.user_id.id);
    formData.append('license_type_id', '' + this.license.license_type_id.id);
    formData.append('raison', '' + this.license.raison);
    formData.append('is_active', '' + 1);
    formData.append('description', '' + this.license.description);
    formData.append('requested_start_date', '' + this.license.requested_start_date);
    formData.append('requested_days', '' + this.license.requested_days);
    formData.append('status', 'REJECTED' );
    this.licenseService.update(formData, this.license.id)
      .then(resp => {
        this.translate.get('Demande_V.RefuseLicenseNotif')
        .subscribe(val => this.notifService.success(val));
        
        this.router.navigate(['/license/demandes']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('License.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}


