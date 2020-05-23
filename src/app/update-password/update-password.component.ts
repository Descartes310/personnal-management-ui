import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { NotifService } from '../_services/notif.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  oldpasswordtype = 'password';
  newpasswordtype = 'password';
  confirmpasswordtype = 'password';
  constructor(
    private authservice: AuthService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      });
  }

  get form() {
  return this.updatePasswordForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    
    if (this.updatePasswordForm.invalid) {
      this.translate.get('UpdatePassword.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      
    }
    
    let newPassword = this.form.newpassword.value;
    let confirmPassword = this.form.confirmpassword.value;
     if(this.form.newpassword.value && this.form.confirmpassword.value ){ 
       if(newPassword.trim() !== confirmPassword.trim()){
        this.translate.get('UpdatePassword.ERROR_NOT_MATCH')
        .subscribe(val => this.notifService.danger(val));
        return false;
       }
     }
 
    const formData = new FormData();
    //console.log(this.form)
    formData.append('oldpassword', '' + this.form.oldpassword.value);
    formData.append('newpassword', '' + this.form.newpassword.value);
    formData.append('confirmpassword', '' + this.form.confirmpassword.value);
    this.isLoading = true;
    this.authservice.updatePassword(formData)
    .then(resp => {
      console.log(resp);
      this.translate.get('UpdatePassword.SubmitSuccess')
      .subscribe(val => this.notifService.success(val));
      this.isSubmitted = false;
      this.updatePasswordForm.reset();
    })
    .catch(err => {
      console.log(err)
      this.translate.get('UpdatePassword.ERROR_TRY_AGAIN')
      .subscribe(val => this.notifService.danger(val));
    })
    .finally(() => this.isLoading = false);  
  }

  showOldPassword(){
    if(this.oldpasswordtype == 'text') {
      this.oldpasswordtype = 'password'
    } else {
      this.oldpasswordtype = 'text'
    }
    return false;
  }
  showNewPassword(){
    if(this.newpasswordtype == 'text') {
      this.newpasswordtype = 'password'
    } else {
      this.newpasswordtype = 'text'
    }
    return false;
  }
  showConfirmPassword(){
    if(this.confirmpasswordtype == 'text') {
      this.confirmpasswordtype = 'password'
    } else {
      this.confirmpasswordtype = 'text'
    }
    return false;
  }

}
