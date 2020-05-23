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

  step1Selected: boolean = true;
  step2Selected: boolean = false;
  step3Selected: boolean = false;
<<<<<<< HEAD

  stepIndexSelected=0;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup :FormGroup;

=======
  stepIndexSelected = 0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  contactForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
<<<<<<< HEAD




=======
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  //variable contact
  public contact: Contact = new Contact();
  //variable pour la recuperation de image
  image: File = null;
<<<<<<< HEAD

=======
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  constructor(private contactservice: ContactService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute) {

<<<<<<< HEAD
    
=======

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  }


  ngOnInit() {
    //cas ou le serveur n'a pas encore renvoye le contact
<<<<<<< HEAD

    
    this.initform();
    this.initform2();
    this.initform3();

=======
    this.initform();
    this.initform2();
    this.initform3();
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    //recuperation du contact
    const contact_id = +this.route.snapshot.paramMap.get("id");
    this.contactservice.find(contact_id).then(
      data => {
        this.contact = data;
        this.initformWithData();
        this.initform2WithData()
        this.initform3WithData()
<<<<<<< HEAD
        
=======
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
      }
    ).catch(
      error => {
        this.translate.get('Role.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/roles/all'])
      }
    )
<<<<<<< HEAD



  }



=======
  }

>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  get form() {
    return this.firstFormGroup.controls;
  }
  get form1() {
    return this.secondFormGroup.controls;
  }
  get form2() {
    return this.thirdFormGroup.controls;
  }
<<<<<<< HEAD

  //init form
  initform(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
=======
  //init form
  initform() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    this.firstFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: '',
      type: 'INTERNAL',
      nature: 'PHYSIC',
      gender: ['', Validators.required]
    });
  }
<<<<<<< HEAD
  initform2(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.secondFormGroup = this.formBuilder.group({
      
      email: ['', [Validators.email, Validators.required]],
      phone1:['', [Validators.pattern(phone_patern)]],
=======
  initform2() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.secondFormGroup = this.formBuilder.group({

      email: ['', [Validators.email, Validators.required]],
      phone1: ['', [Validators.pattern(phone_patern)]],
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
      phone2: ['', [Validators.pattern(phone_patern)]],
      phone3: ['', [Validators.pattern(phone_patern)]],
      fax: '',
      bp: '',
    });
  }

<<<<<<< HEAD
  initform3(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.thirdFormGroup = this.formBuilder.group({
      
      twitter: '',
      facebook: '',
      whatsapp:'',
      linkedin: '',
      website: '',
      
    });
  }

  //withdatea
   //init form
   initformWithData(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
=======
  initform3() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.thirdFormGroup = this.formBuilder.group({
      twitter: '',
      facebook: '',
      whatsapp: '',
      linkedin: '',
      website: '',
    });
  }
  //withdatea
  //init form
  initformWithData() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    this.firstFormGroup = this.formBuilder.group({
      name: [this.contact.name, [Validators.required]],
      description: this.contact.description,
      type: this.contact.type,
      nature: this.contact.nature,
<<<<<<< HEAD
    
      gender: [this.contact.gender, Validators.required],
      
      

      

    });
  }
  initform2WithData(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.secondFormGroup = this.formBuilder.group({
      
=======

      gender: [this.contact.gender, Validators.required],
    });
  }
  initform2WithData() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.secondFormGroup = this.formBuilder.group({
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
      email: [this.contact.email, [Validators.email]],
      phone1: [this.contact.phone1, [Validators.pattern(phone_patern)]],
      phone2: [this.contact.phone2, [Validators.pattern(phone_patern)]],
      phone3: [this.contact.phone3, [Validators.pattern(phone_patern)]],
      fax: this.contact.fax,
      bp: this.contact.bp,
    });
  }
<<<<<<< HEAD

  initform3WithData(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.thirdFormGroup = this.formBuilder.group({
      
     
=======
  initform3WithData() {
    let phone_patern = "^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.thirdFormGroup = this.formBuilder.group({
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
      twitter: this.contact.twitter,
      facebook: this.contact.facebook,
      whatsapp: this.contact.whatsapp,
      linkedin: this.contact.linkedin,
      website: this.contact.website,
<<<<<<< HEAD
      
    });
  }





=======
    });
  }
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  //submit the form
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    //this.form.name.setValue(this.role_name);
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
<<<<<<< HEAD

    //si tout ce passe bien

    this.isLoading = true;
        const formData = new FormData();
=======
    //si tout ce passe bien
    this.isLoading = true;
    const formData = new FormData();
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    //ajout des donnees dans le form date
    formData.append('name', '' + this.form.name.value);
    formData.append('type', '' + this.form.type.value);
    formData.append('nature', '' + this.form.nature.value);
    formData.append('description', '' + this.form.description.value);
<<<<<<< HEAD

=======
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    formData.append('email', '' + this.form1.email.value);
    formData.append('phone1', '' + this.form1.phone1.value);
    formData.append('phone2', '' + this.form1.phone2.value);
    formData.append('phone3', '' + this.form1.phone3.value);
    formData.append('fax', '' + this.form1.fax.value);
    formData.append('bp', '' + this.form1.bp.value);
    formData.append('twitter', '' + this.form2.twitter.value);
    formData.append('facebook', '' + this.form2.facebook.value);
    formData.append('whatsapp', '' + this.form2.whatsapp.value);
    formData.append('linkedin', '' + this.form2.linkedin.value);
    formData.append('website', '' + this.form2.website.value);
    formData.append('gender', '' + this.form.gender.value);

    //recuperation  de image
<<<<<<< HEAD
    formData.append('picture',this.image);
=======
    formData.append('picture', this.image);
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d


    this.contactservice.update(formData, 1)
      .then(resp => {
<<<<<<< HEAD
        this.translate.get('Role.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
         //reinitialisation
         this.firstFormGroup.reset();
         this.secondFormGroup.reset();
         this.thirdFormGroup.reset();
         this.stepIndexSelected=0;
         this.router.navigate(['/contacts'])
=======
        this.translate.get('Contact .SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        //reinitialisation
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.stepIndexSelected = 0;
        this.router.navigate(['/contacts/all'])
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d

      })
      .catch(err => {
        console.log(err)
        this.translate.get('Contact.UpdateErrorSubmit')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
<<<<<<< HEAD



=======
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
  detectimage(event) {
    this.image = event.target.files[0];
    console.log(this.image)
  }
<<<<<<< HEAD
//validation de chaque etape

  validStep1() {
    if(this.firstFormGroup.invalid){
      this.stepIndexSelected=0; 
      this.isSubmitted=true;
      this.translate.get('Contact.SubmitError')
      .subscribe(val => this.notifService.danger(val));
    }
    else{
      this.isSubmitted=false;
      this.stepIndexSelected=1;
    }
        
     
    
  }

  previous1(){
    this.stepIndexSelected=0;
  }
  previous2(){
    this.stepIndexSelected=1;
  }
  previous3(){
    this.stepIndexSelected=2;
  }
  //step 2
  validStep2() {
    if(this.secondFormGroup.invalid){
      this.stepIndexSelected=1; 
      this.isSubmitted=true;
      this.translate.get('Contact.SubmitError')
      .subscribe(val => this.notifService.danger(val));
    }
    else{
      this.isSubmitted=false;
      this.stepIndexSelected=2;
=======
  //validation de chaque etape
  validStep1() {
    if (this.firstFormGroup.invalid) {
      this.stepIndexSelected = 0;
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
    }
    else {
      this.isSubmitted = false;
      this.stepIndexSelected = 1;
    }
  }
  previous1() {
    this.stepIndexSelected = 0;
  }
  previous2() {
    this.stepIndexSelected = 1;
  }
  previous3() {
    this.stepIndexSelected = 2;
  }
  //step 2
  validStep2() {
    if (this.secondFormGroup.invalid) {
      this.stepIndexSelected = 1;
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
    }
    else {
      this.isSubmitted = false;
      this.stepIndexSelected = 2;
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
    }
  }
  //valid step 3
  validStep3() {
<<<<<<< HEAD
    
    if(this.secondFormGroup.invalid){
      this.stepIndexSelected=2; 
      this.isSubmitted=true;
      this.translate.get('Contact.SubmitError')
      .subscribe(val => this.notifService.danger(val));
    }
    else{
      this.isSubmitted=false;
      this.stepIndexSelected=3;
    }
}
=======

    if (this.secondFormGroup.invalid) {
      this.stepIndexSelected = 2;
      this.isSubmitted = true;
      this.translate.get('Contact.SubmitError')
        .subscribe(val => this.notifService.danger(val));
    }
    else {
      this.isSubmitted = false;
      this.stepIndexSelected = 3;
    }
  }
>>>>>>> d6ba1dc53e32f0a134509460cb2dfc9823f7a00d
}
