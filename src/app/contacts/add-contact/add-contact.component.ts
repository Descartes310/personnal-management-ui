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

  //selection des fill
  fill1Selected:boolean=true;
  fill2Selected:boolean=false;
  fill3Selected:boolean=false;
  fill4Selected:boolean=false;
  //selection des panneaux
  panel1selected:boolean=true;
  panel2selected:boolean

  contactForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;


  constructor(private contactservice:ContactService,
              private notifService: NotifService,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private router: Router,) { }

  ngOnInit() {
    
    this.initform();
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
      email: ['', [Validators.email]],
      phone1:['', [Validators.pattern(phone_patern)]],
      phone2: ['', [Validators.pattern(phone_patern)]],
      phone3: ['', [Validators.pattern(phone_patern)]],
      fax: '',
      bp: '',
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

  //changement des panneaux
  public changepanel(value){
    if(value==1){
      this.panel1selected=true;
      this.panel2selected=false
    }
    else{
      this.panel1selected=false;
      this.panel2selected=true;
    }
  }

  //change fill
  changefill(value){
    if(value===1){
      this.fill1Selected=true;
      this.fill2Selected=false;
      this.fill3Selected=false;
      this.fill4Selected=false;
    }
    else if(value===2){
      this.fill1Selected=false;
      this.fill2Selected=true;
      this.fill3Selected=false;
      this.fill4Selected=false;
    }
    else if(value===3){
      this.fill1Selected=false;
      this.fill2Selected=false;
      this.fill3Selected=true;
      this.fill4Selected=false;
    }
    else{
      this.fill1Selected=false;
      this.fill2Selected=false;
      this.fill3Selected=false;
      this.fill4Selected=true;
    }

  }

  next(){
    if(this.fill1Selected){
      this.changefill(2);
    }
    else if(this.fill2Selected){
      this.changefill(3);
    }
    else if(this.fill3Selected){
      this.changefill(4);
    }
    else{
      this.changefill(1);
    }
  }

  previous(){
    if(this.fill1Selected){
      return;
    }
    else if(this.fill2Selected){
      this.changefill(1);
    }
    else if(this.fill3Selected){
      this.changefill(2);
    }
    else{
      this.changefill(3);
    }
  }

  reset(){
    this.fill1Selected=true;
    this.changefill(1);
    this.contactForm.reset();
  }



}
