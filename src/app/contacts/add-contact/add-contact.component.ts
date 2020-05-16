import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/_services/contact.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup :FormGroup;

  contactForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
//variable pour la recuperation de image
  image:File=null;
  constructor(private contactservice:ContactService,
              private notifService: NotifService,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private router: Router,) { }

  ngOnInit() {
   
  
    
    this.initform();
    this.initform2();
    this.initform3();
  }

  get form() {
    return this.contactForm.controls;
  }

  //init form
  initform(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: '',
      type: 'INTERNAL',
      nature: 'PHYSIC',
     
      
      

      

    });
  }
  initform2(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.secondFormGroup = this.formBuilder.group({
      
      email: ['', [Validators.email]],
      phone1:['', [Validators.pattern(phone_patern)]],
      phone2: ['', [Validators.pattern(phone_patern)]],
      phone3: ['', [Validators.pattern(phone_patern)]],
      fax: '',
      bp: '',
    });
  }

  initform3(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.thirdFormGroup = this.formBuilder.group({
      
      twitter: '',
      facebook: '',
      whatsapp:'',
      linkedin: '',
      website: '',
      gender: ['', Validators.required],
    });
  }

    
  
  //submit the form
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    //this.form.name.setValue(this.role_name);
    if (this.contactForm.invalid) {
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    //si tout ce passe bien

    this.isLoading = true;
    const formData = new FormData();
    //ajout des donnees dans le form date
    formData.append('name', '' + this.form.name.value);
    formData.append('type', '' + this.form.type.value);
    formData.append('nature', '' + this.form.nature.value);
    formData.append('description', '' + this.form.description.value);

    formData.append('email', '' + this.form.email.value);
    formData.append('phone1', '' + this.form.phone1.value);
    formData.append('phone2', '' + this.form.phone2.value);
    formData.append('phone3', '' + this.form.phone3.value);
    formData.append('fax', '' + this.form.fax.value);
    formData.append('bp', '' + this.form.bp.value);
    formData.append('twitter', '' + this.form.twitter.value);
    formData.append('facebook', '' + this.form.facebook.value);
    formData.append('whatsapp', '' + this.form.whatsapp.value);
    formData.append('linkedin', '' + this.form.linkedin.value);
    formData.append('website', '' + this.form.website.value);
    formData.append('gender', '' + this.form.gender.value);

    //recuperation  de image
    formData.append('image',this.image,this.image.name);

    
    this.contactservice.add(formData)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.contactForm.reset();
        
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Login.AUTH_LOGIN')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }




}
