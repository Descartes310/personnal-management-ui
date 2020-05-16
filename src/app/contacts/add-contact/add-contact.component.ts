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

  //selection des fill: pour la gestion du wizard
  fill1Selected:boolean=true;
  fill2Selected:boolean=false;
  fill3Selected:boolean=false;
  fill4Selected:boolean=false;
 

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


  //change fill
  changefill(value) {
    if (value === 1) {
      this.fill1Selected = true;
      this.fill2Selected = false;
      this.fill3Selected = false;
      this.fill4Selected = false;
    }
    else if (value === 2) {
      this.fill1Selected = false;
      this.fill2Selected = true;
      this.fill3Selected = false;
      this.fill4Selected = false;
    }
    else if (value === 3) {
      this.fill1Selected = false;
      this.fill2Selected = false;
      this.fill3Selected = true;
      this.fill4Selected = false;
    }
    else {
      this.fill1Selected = false;
      this.fill2Selected = false;
      this.fill3Selected = false;
      this.fill4Selected = true;
    }

  }

  next1() {
    var btn = document.getElementById('next-btn');
     if (this.fill1Selected && !this.validStep1()) {
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));

      console.log(btn)
      //btn.click();
      
      console.log("*************")
      console.log(this.fill1Selected)
      console.log(this.fill2Selected)
      console.log(this.fill3Selected)
      console.log(this.fill4Selected)
    }

    else if (this.fill2Selected && !this.validStep2()) {
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      var btn = document.getElementById('prev-btn');
      btn.click();
      this.changefill(2);

    }
    else if (this.fill3Selected) {
      btn.click();
    }
    else if (!this.fill3Selected) {
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      var btn = document.getElementById('prev-btn');
      btn.click();
      this.changefill(3);

    }
    else if (this.fill4Selected) {
      btn.click();
    }
    else if (!this.fill4Selected) {
      
      return

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
  /*previous() {

    if (this.fill2Selected) {
      this.changefill(1);
    }
    else if (this.fill3Selected) {
      this.changefill(2);

    }
    else if (this.fill4Selected) {
      this.changefill(3);
    }
 
  }*/

  reset() {
    this.fill1Selected = true;
    this.changefill(1);
    this.contactForm.reset();
  }


  detectimage(event) {
    this.image = event.target.files[0];
    console.log(this.image)
  }

  //validation de chaque block de formulaire

  validStep1() {
    if (!this.form.name.errors)
      return true;
    return false;
  }
  //step 2
  validStep2() {
    if (!this.form.phone1.errors && !this.form.phone2.errors && !this.form.phone2.errors && !this.form.email.errors)
      return true;
    return false;
  }
  //valid step 3
  validStep3() {

    if (!this.contactForm.invalid)
      return true;
    return false;
  }

  valid(){
    if(!this.validStep1()||!this.validStep2() || !this.validStep3() )
        return false;
    return true;

  }


}
