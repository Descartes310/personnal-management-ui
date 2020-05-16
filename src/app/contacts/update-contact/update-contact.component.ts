import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/_services/contact.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/_models/contact.model';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {

  //selection des fill
  fill1Selected: boolean = false;
  fill2Selected: boolean = false;
  fill3Selected: boolean = false;
  fill4Selected: boolean = false;


  contactForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;



  //variable contact
  public contact: Contact = new Contact();
  //variable pour la recuperation de image
  image: File = null;

  constructor(private contactservice: ContactService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute) {

    this.fill1Selected = true;
  }


  ngOnInit() {
    //cas ou le serveur n'a pas encore renvoye le contact

    this.initform();

    //recuperation du contact
    const contact_id = +this.route.snapshot.paramMap.get("id");
    this.contactservice.find(contact_id).then(
      data => {
        this.contact = data;
        this.initformWithData();
      }
    ).catch(
      error => {
        this.translate.get('Role.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/roles/all'])
      }
    )



  }

  get form() {
    return this.contactForm.controls;
  }


  //init form
  initform() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: '',
      type: 'INTERNAL',
      nature: 'PHYSIC',
      email: ['', [Validators.email]],
      phone1: ['', [Validators.pattern(phone_patern)]],
      phone2: ['', [Validators.pattern(phone_patern)]],
      phone3: ['', [Validators.pattern(phone_patern)]],
      fax: '',
      bp: '',
      twitter: '',
      facebook: '',
      whatsapp: '',
      linkedin: '',
      website: '',
      gender: ['', Validators.required],




    });
  }

  //remplissage du formulaire lorsque le role arrivera
  initformWithData() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.contactForm = this.formBuilder.group({
      name: [this.contact.name, [Validators.required]],
      description: this.contact.description,
      type: this.contact.type,
      nature: this.contact.nature,
      email: [this.contact.email, [Validators.email]],
      phone1: [this.contact.phone1, [Validators.pattern(phone_patern)]],
      phone2: [this.contact.phone2, [Validators.pattern(phone_patern)]],
      phone3: [this.contact.phone3, [Validators.pattern(phone_patern)]],
      fax: this.contact.fax,
      bp: this.contact.bp,
      twitter: this.contact.twitter,
      facebook: this.contact.facebook,
      whatsapp: this.contact.whatsapp,
      linkedin: this.contact.linkedin,
      website: this.contact.website,
      gender: [this.contact.gender, Validators.required],




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
    formData.append('image', this.image, this.image.name);

    this.contactservice.update(formData, 1)
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
      
      console.log("*************")
      console.log(this.fill1Selected)
      console.log(this.fill2Selected)
      console.log(this.fill3Selected)
      console.log(this.fill4Selected)
    }

    else if (this.fill2Selected && this.validStep2()) {
      
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
    console.log("*************")
    console.log(this.fill1Selected)
    console.log(this.fill2Selected)
    console.log(this.fill3Selected)
    console.log(this.fill4Selected)
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
