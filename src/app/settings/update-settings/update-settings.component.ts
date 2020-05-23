import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Setting } from 'src/app/_models/setting.model';
import { SettingService } from 'src/app/_services/setting.service';


@Component({
  selector: 'app-update-settings',
  templateUrl: './update-settings.component.html',
  styleUrls: ['./update-settings.component.scss']
})
export class UpdateSettingsComponent implements OnInit {

  settingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  setting: Setting = new Setting();

  constructor(
    private settingService: SettingService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }
  

  ngOnInit() {
    this.initForm();
    const setting_id = +this.route.snapshot.paramMap.get("id");
    this.settingService.find(setting_id).then(
      data => {
        console.log(data)
        this.setting = data;
        this.initForm(true);
        console.log(this.setting)
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('Settings.NotFound')
        .subscribe(val => this.notifService.danger(val));
        //this.router.navigate(['/home'])
      }
    )

  }

  initForm(withSetting = false) {
    if(withSetting) {
      console.log(this.setting)
      this.settingForm = this.formBuilder.group({
        key: [this.setting.key, [Validators.required]],
        value: [this.setting.value],
        description: [this.setting.description]
      });
    }else {
      this.settingForm = this.formBuilder.group({
        key: ['', [Validators.required]],
        value: [''],
        description: ['']
      });
    }
  }

  get form() {
    return this.settingForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.settingForm.invalid) {
      this.translate.get('Settings.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
      const formData = new FormData();
      formData.append('key', '' + this.form.key.value);
      formData.append('value', '' + this.form.value.value);
      formData.append('description', '' + this.form.description.value);

    this.settingService.update(formData, this.setting.id)
      .then(resp => {
        this.translate.get('Settings.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.settingForm.reset();
        this.router.navigate(['/settings/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Settings.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}

  
  
  

