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

  //gestion des steppers
  step1Selected: boolean = true;
  step2Selected: boolean = false;
  step3Selected: boolean = false;
  stepIndexSelected=0;
  isLinear = false;
  //gestion des formgroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup :FormGroup;
  //
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
    return this.firstFormGroup.controls;
  }
  get form1() {
    return this.secondFormGroup.controls;
  }
  get form2() {
    return this.thirdFormGroup.controls;
  }

  //init form
  initform(){
    let phone_patern="^((\\+[0-9]{3}-?))?[0-9]{8}$";
    this.firstFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: '',
      type: 'INTERNAL',
      nature: 'PHYSIC',
      gender: ['', Validators.required]
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
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid) {
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
    formData.append('picture',this.image);
    this.contactservice.add(formData)
      .then(resp => {
        this.translate.get('Contact.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        //reinitialisation
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.stepIndexSelected=0;
        
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Contact.ErrorSubmit')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  detectimage(event) {
      this.image = event.target.files[0];
      console.log(this.image)
  }
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
    }
  }
  //valid step 3
  validStep3() {
    
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

}
