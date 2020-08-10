import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/_services/profile.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss']
})
export class AddProfileComponent implements OnInit {


  permissions: any[] = [];
  permissions_tmp: any[] = [];
  selected_permissions: number[] = [];


  
  profileForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  showTable = false;
  bools=0;
  options: any[] = [];
  profile_name = '';
  titleOptions= [];
  public errorMessages: any = {};
  public selectedOption : any ;
  public select: any ;
  public input:any;
  public formData = new FormData();
  required: boolean = false;
  unique: boolean = false;
  updatable: boolean = false;
  private: boolean = false;
 
  constructor(
    private profileService: ProfileService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      placeholder : [''],
      description: [''],
      slug : [''],
      min :[0, Validators.min(0)],
      max : [0, Validators.min(0)],
      type :['',Validators.required],
      is_private :[false, Validators.required],
      is_required : [false,Validators.required],
      is_unique : [false,Validators.required],
      is_updatable : [false,Validators.required],
      default : [false],
      step : [0, Validators.min(0)]
    });

    this.errorMessages = {
      name: [
        { type: 'required', message: '' }
      ],
      step: [
        { type: 'step', message: '' },
      ],
      min: [
        { type: 'min', message: '' },
      ],
      max: [
        { type: 'max', message: '' },
      ]
    }

  this.getNameErrorMessages();
  this.getStepErrorMessages();
  this.getMinErrorMessages();
  this.getMaxErrorMessages();
  }

  addOption() {
    let option = {
      id: this.options.length+1,
      value: '' 
    }
    this.options.push(option);
  }

  removeOption(id) {
    this.options.splice(this.options.indexOf(this.options.filter(option => option.id == id)[0]), 1);
  }

  updateOption(id, event) {
    let option = this.options.filter(option => option.id == id)[0];
    let index = this.options.indexOf(option);
    option.value = event.target.value;
    this.options[index] = option;
  }

  public getNameErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Name').subscribe(val => {
    this.errorMessages.name[0].message = val[0];
    });
  }

  public  getStepErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Step').subscribe(val => {
      this.errorMessages.step[0].message = val[0];
    });
  }

  public  getMinErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Min').subscribe(val => {
      this.errorMessages.min[0].message = val[0];
    });
  }

  public  getMaxErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Max').subscribe(val => {
      this.errorMessages.max[0].message = val[0];
    });
  }

  isRequired(event){
    this.required = !this.required;
  }
  

  isUnique(event){
    
    this.unique = !this.unique;  
  }


  isUpdatable(event){
    
    this.updatable = !this.updatable;  
  }

  

   isPrivate(event){
    this.private = !this.private;
  }

  name() {
    return this.profileForm.get('name');
  };

  get step() {
    return this.profileForm.get('step');
  }

  get min() {
    return this.profileForm.get('min');
  };

  get max() {
    return this.profileForm.get('max');
  }


  get form() {
    return this.profileForm.controls;
  }

 
  computeName(event){
   this.profile_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
   
  }
 
  checkOptions(event){
     this.input=event.target.value;
      return this.input;
  }

  add(){
    const option =this.input ;
    if( option != null){
        return this.titleOptions.push(option);
    }
  }

  selectOption(value){
    this.selectedOption = value;
    
  }

  delete(){
    let tmp = this.input;
    const titleOptions2 = this.titleOptions;
    this.titleOptions = [];
    for(const k of titleOptions2){
      if(k !=tmp){
        this.titleOptions.push(k);
      }
    }
  }

  showAction(event){
    let option = event.target.value;
    if ( option == 'select') {
      this.options = [
        {
          id: 1,
          value: ''
        }
      ]
      this.showTable = true;  
    } else {
      this.options = [];
      this.showTable = false;
    }
  }


  checkStep(event) {
    let value = parseInt(event.target.value);
    if(value > 100)
      this.form.step.setValue(100);
  }

  checkMin(event) {
    let value = parseInt(event.target.value);
    if(value > 100)
      this.form.min.setValue(100);
  }
  
  checkMax(event) {
    let value = parseInt(event.target.value);
    if(value > 100)
      this.form.max.setValue(100);
  }
  
  

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.profileForm.invalid) {
      this.translate.get('erreur')
        .subscribe(val => this.notifService.danger(val));
      return; 
   }
    this.isLoading = true;
    this.formData.append('name', this.form.name.value);
    this.formData.append('description', '' + this.form.description.value);
    this.formData.append('is_unique', this.unique ? '1' : '0');
    this.formData.append('is_required',  this.required ? '1' : '0');
    this.formData.append('is_private', this.private ? '1' : '0');
    this.formData.append('min', '' + this.form.min.value);
    this.formData.append('max', '' + this.form.max.value);
    this.formData.append('is_updatable', this.updatable ? '1' : '0');
    this.formData.append('type', '' + this.form.type.value);
    this.formData.append('placeholder', '' + this.form.placeholder.value);
    this.formData.append('step', '' + this.form.step.value);
    this.formData.append('default', '' + this.form.default.value);
    if(this.form.type.value == 'select') {
      this.options.forEach(option => {
        this.formData.append('options[]', '' + option.value);
      })
    }
    console.log("test arrivée 3");
    
   console.log(this.formData);
    this.profileService.add(this.formData)
      .then(resp => {
       console.log(resp);
        this.translate.get('AddProfile.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.profileForm.reset();
        this.options = [];
        this.showTable = false;    
      //  this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Profile.SubmitErrors')
        .subscribe(val => this.notifService.danger(val));

      })
      .finally(() => this.isLoading = false);
  }

}
