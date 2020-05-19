import { Component, OnInit } from '@angular/core';
import { LicensetypeService } from 'src/app/_services/licensetype.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Licensetype } from 'src/app/_models/licensetype.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-licensetypes',
  templateUrl: './add-licensetypes.component.html',
  styleUrls: ['./add-licensetypes.component.scss']
})
export class AddLicensetypesComponent implements OnInit {

  
  permissions: any[] = [];
  permissions_tmp: any[] = [];
  selected_permissions: number[] = [];

  licensetypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
 licensetype_name = '';

  constructor(
    private licensetypeService: LicensetypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.licensetypeForm = this.formBuilder.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      days: ['', Validators.required]
    });
  }

  get form() {
    return this.licensetypeForm.controls;
  }

  computeName(event){
    this.licensetype_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  search(event) {
    this.permissions = this.permissions_tmp;
    this.permissions = this.permissions_tmp.filter( permission => permission.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.licensetype_name);
    if (this.licensetypeForm.invalid) {
      this.translate.get('Licensetype.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('slug', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('days', '' + this.form.days.value);
    this.licensetypeService.add(formData)
      .then(resp => {
        this.translate.get('Licensetype.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.licensetypeForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Licensetype.LICENSETYPE_ALREADY_EXISTS')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
