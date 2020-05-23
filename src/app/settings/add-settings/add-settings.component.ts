import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/_services/setting.service';


@Component({
  selector: 'app-add-settings',
  templateUrl: './add-settings.component.html',
  styleUrls: ['./add-settings.component.scss']
})
export class AddSettingsComponent implements OnInit {
  settingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  constructor(
    private settingService: SettingService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.settingForm = this.formBuilder.group({
      key: ['', Validators.required],
      value: [''],
      description: ['']
    });
  }

  get form() {
    return this.settingForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
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

    this.settingService.add(formData)
      .then(resp => {
        this.translate.get('Settings.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.settingForm.reset();
        this.router.navigate(['/settings/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Settings.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}