import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile } from 'src/app/_models/profile.model';
import { ProfileService } from 'src/app/_services/profile.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  profileForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  profile_name = '';
  profile: Profile = new Profile();
  options: any[] = [];
  WithProfile :boolean;
  required;
  unique;
  updatable;
  private;
  formData = new FormData();

 
  showTable = false;


  constructor(
    private profileService: ProfileService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const id = +this.route.snapshot.paramMap.get("id");
    this.profileService.find(id)
      .then(
        data => {
          this.profile = data;
          this.profile.slug="";
          this.initForm(true);
          if(this.profile.type == 'select') {
            this.showTable = true;
            this.profile.options.map(option => {
              let tmp = {
                id: this.options.length+1,
                value: option.value
              }
              this.options.push(tmp);
            })
          }
          
          console.log(this.profile);
        }
      ).catch(
        error => {
          this.translate.get('Profiles.' + error.error.code)
            .subscribe(val => this.notifService.danger(val));
          this.router.navigate(['home'])
        }
      )

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

  initForm(WithProfile = false) {
    if (WithProfile) {
      this.profileForm = this.formBuilder.group({
        name: [this.profile.name, Validators.required],
        description: [this.profile.description],
        type: [this.profile.type, Validators.required],
        step: [this.profile.step],
        slug: [this.profile.slug],
        min: [this.profile.min],
        max: [this.profile.max],
        is_required: [this.profile.is_required],
        is_unique: [this.profile.is_unique],
        is_updatable: [this.profile.is_updatable],
        is_private: [this.profile.is_private],
        placeholder: [this.profile.placeholder],
        default: [this.profile.default]
        
      });
    } else {
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
    }
  }

  get form() {
    return this.profileForm.controls;
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

  isRequired(event){
    this.required = event.target.checked; 
    console.log(this.required)   
  }
  

  isUnique(event){
    
    this.unique = event.target.checked; 
    console.log(this.unique)   
  }


  isUpdatable(event){
    
    this.updatable = event.target.checked; 
    console.log(this.updatable)   
  }

  

   isPrivate(event){
    this.private = event.target.checked; 
    console.log(this.private)   
  }

  computeName(name: string): string {
   return this.profile_name = name.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.slug.setValue(this.profile_name);
    console.log(this.profile_name);
    if (this.profileForm.invalid) {
      this.translate.get('Profiles.SubmitError')
        .subscribe(val => this.notifService.danger(val)) ;
      return;
    }

    this.isLoading = true;
    this.formData.append('name', '' + this.form.name.value);
    this.formData.append('description', '' + this.form.description.value);
    this.formData.append('slug', '' + this.form.slug.value);
    console.log(this.form.slug.value);
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
  
    this.profileService.update(this.formData, this.profile.id)
      .then(resp => {
        console.log('bjr');
        this.translate.get('profiles.UpdateSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        //this.profileForm.reset();
        //this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
        this.translate.get('profiles.' + err.error.code)
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}