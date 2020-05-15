import { Component, OnInit } from '@angular/core';
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProSituation } from 'src/app/_models/pro_situation.model';
import { Router } from '@angular/router';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
@Component({
  selector: 'app-add-pro-situation',
  templateUrl: './add-pro-situation.component.html',
  styleUrls: ['./add-pro-situation.component.scss']
})
export class AddProSituationComponent implements OnInit {

  proSituationForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  pro_situation_name = '';

  constructor(
    private proSituationService: ProSituationService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.proSituationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      weight: [1, 
        [ 
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]
      ],
    });
  }

  get form() {
    return this.proSituationForm.controls;
  }

  computeName(event){
    this.pro_situation_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.pro_situation_name);
    if (this.proSituationForm.invalid) {
      this.translate.get('ProSituation.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('weight', this.form.weight.value);
   
    this.proSituationService.add(formData)
      .then(resp => {
        this.translate.get('ProSituation.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.proSituationForm.reset();
      })
      .catch(error => {
        console.log(error);
        if(error.error.errors.name) {
          this.translate.get('ProSituation.' + error.error.code + '.Name', { data: this.pro_situation_name })
          .subscribe(val => this.notifService.danger(val));
        } else if(error.error.errors.weight) {
          this.translate.get('ProSituation.' + error.error.code + '.Weight', { data: this.form.weight })
          .subscribe(val => this.notifService.danger(val));
        }
      })
      .finally(() => this.isLoading = false);
  }

}
