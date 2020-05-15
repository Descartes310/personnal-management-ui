import { Component, OnInit } from '@angular/core';
import { ProSituationService } from 'src/app/_services/pro_situation.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProSituation } from 'src/app/_models/pro_situation.model';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
*/
@Component({
  selector: 'app-update-pro-situation',
  templateUrl: './update-pro-situation.component.html',
  styleUrls: ['./update-pro-situation.component.scss']
})
export class UpdateProSituationComponent implements OnInit {

  proSituationForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  pro_situation_name = '';
  pro_situation: ProSituation = new ProSituation();


  constructor(
    private proSituationService: ProSituationService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
    const pro_situation_id = +this.route.snapshot.paramMap.get("id");
    this.proSituationService.find(pro_situation_id).then(
      data => {
        this.pro_situation = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('ProSituation.' + error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/pro-situations/all'])
      }
    ) 
  }

  initForm(withProSituation = false) {
    if(withProSituation) {
      this.pro_situation_name = this.pro_situation.name;
      this.proSituationForm = this.formBuilder.group({
        name: [this.pro_situation.name, [Validators.required]],
        description: [this.pro_situation.description],
        weight: [this.pro_situation.weight, 
          [ 
            Validators.required,
            Validators.min(1),
            Validators.max(100),
          ]
        ],
      });
    } else {
      this.proSituationForm = this.formBuilder.group({
        name: ['', [Validators.required]],
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
    this.isLoading = false;
    
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
  
    this.proSituationService.update(formData, this.pro_situation.id)
      .then(resp => {
        console.log(resp);
        this.translate.get('ProSituation.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.proSituationForm.reset();
        this.router.navigate(['/pro_situations/all']);
      })
      .catch(error => {
        console.log(error)
        if(error) {
          this.translate.get('ProSituation.' + error.error.code, { data: this.pro_situation_name })
          .subscribe(val => this.notifService.danger(val));
        } else {
          this.translate.get('ProSituation.UnknowError')
          .subscribe(val => this.notifService.danger(val));
        }
      })
      .finally(() => this.isLoading = false);
  }

}

