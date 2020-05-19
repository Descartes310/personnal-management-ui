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
  public isError: boolean = false;
  public isSuccess: boolean = false;
  public isSubmitted: boolean = false;
  public proSituationName: string = '';
  public errorMessages: any = {};

  constructor(
    private proSituationService: ProSituationService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.proSituationForm = this.formBuilder.group({
      name: [' ', Validators.required],
      description: [''],
      weight: [1, 
        [ 
          Validators.required,
          Validators.min(1),
          Validators.max(100),
        ]
      ],
    });

    this.errorMessages = {
      name: [
        { type: 'required', message: '' }
      ],
      weight: [
        { type: 'required', message: '' },
        { type: 'min', message: '' },
        { type: 'max', message: '' },
      ]
    }

    this.getNameErrorMessages();
    this.getWeightErrorMessages();

  }

  public getNameErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Name').subscribe(val => {
    this.errorMessages.name[0].message = val[0];
    });
  }

  public  getWeightErrorMessages() {
    this.translate.get('ProSituation.ErrorMessages.Weight').subscribe(val => {
      this.errorMessages.weight[0].message = val[0];
      this.errorMessages.weight[1].message = val[1];
      this.errorMessages.weight[2].message = val[2];
    });
  }

  get name() {
    return this.proSituationForm.get('name');
  };

  get weight() {
    return this.proSituationForm.get('weight');
  }

  get form() {
    return this.proSituationForm.controls;
  }

  // computeName(event) {
  //   let name = event.target.value.trim();
  //   this.proSituationName = name.replace(/[^A-Z0-9]/ig, "_");
  // }

  checkWeight(event) {
    let value = parseInt(event.target.value);
    if(value > 100)
      this.form.weight.setValue(100);
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    //this.form.name.setValue(this.proSituationName);
    if (this.proSituationForm.invalid) {
      this.translate.get('ProSituation.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value.trim());
    formData.append('weight', '' + this.form.weight.value);

    this.proSituationService.add(formData)
      .then(resp => {
        this.translate.get('ProSituation.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.proSituationForm.reset();
      })
      .catch(error => {
        console.log(error);
        if(error.status == 0 && error.statusText == "Unknown Error" && !error.ok) {
          this.translate.get('ProSituation.NetWorkError')
          .subscribe(val => this.notifService.danger(val));
        } else if(error.error.errors.name) {
          this.translate.get('ProSituation.' + error.error.code + '.Name', { data: this.proSituationName })
          .subscribe(val => this.notifService.danger(val));
        } else if(error.error.errors.weight) {
          this.translate.get('ProSituation.' + error.error.code + '.Weight', { data: this.form.weight })
          .subscribe(val => this.notifService.danger(val));
        }
      })
      .finally(() => this.isLoading = false);
  }

}
