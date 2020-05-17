import { Component, OnInit } from '@angular/core';
import { LicensetypeService } from 'src/app/_services/licensetype.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Licensetype } from 'src/app/_models/licensetype.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-licensetypes',
  templateUrl: './update-licensetypes.component.html',
  styleUrls: ['./update-licensetypes.component.scss']
})
export class UpdateLicensetypesComponent implements OnInit {

  licensetypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  licensetype_name = '';
  licensetype: Licensetype = new Licensetype();


  constructor(
    private licensetypeService: LicensetypeService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const licensetype_id = +this.route.snapshot.paramMap.get("id");
    this.licensetypeService.find(licensetype_id).then(
      data => {
        this.licensetype = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('Licensetype.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
      }
    )

  }

  initForm(withLicensetype = false) {
    if(withLicensetype) {
      console.log(this.licensetype)
      this.licensetypeForm = this.formBuilder.group({
        name: [this.licensetype.slug, [Validators.required]],
        label: [this.licensetype.name, [Validators.required]],
        days: [this.licensetype.days, [Validators.required]],
        description: [this.licensetype.description]
        
      });
    }else {
      this.licensetypeForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        label: ['', [Validators.required]],
        days: ['',[Validators.required]],
        description: [''],
      });
    }
  }

  get form() {
    return this.licensetypeForm.controls;
  }

  computeName(event){
    this.licensetype_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if(this.licensetype_name.trim().length>0){
      this.form.name.setValue(this.licensetype_name);
    }
    if (this.licensetypeForm.invalid) {
      this.translate.get('Licensetype.SubmitErrortype')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('slug', '' + this.form.name.value);
    formData.append('days', '' + this.form.days.value);
    formData.append('description', '' + this.form.description.value);
    this.licensetypeService.update(formData, this.licensetype.id)
      .then(resp => {
        this.translate.get('Licensetype.UpdateLicensetype')
        .subscribe(val => this.notifService.success(val));
        this.router.navigate(['/licensetypes'])

      })
      .catch(err => {
        console.log(err)
        this.translate.get('Licensetype.NoUpdateLicensetype')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
