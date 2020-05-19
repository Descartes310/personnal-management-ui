import { Component, OnInit } from '@angular/core';
import { TrainingService} from 'src/app/_services/training.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Training} from 'src/app/_models/training.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  training: any[] = [];
  training_tmp: any[] = [];

  trainingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  training_name = '';
  constructor(
    private trainingService: TrainingService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.trainingForm = this.formBuilder.group({
      name: ['', Validators.required],
      trainer: ['', Validators.required],
      start_date: ['', Validators.required],
      location: ['', Validators.required],
      duration: [1,
                  [
                    Validators.required,
                    Validators.min(1),
                    Validators.max(100)
                  
                  ]],
      description: [''],
      //is_online: ['']
    });
  }

  get form() {
    return this.trainingForm.controls;
  }

  computeName(event){
    this.training_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.trainingForm.invalid) {
      this.translate.get('Training.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
  
    this.isLoading = true;
      const formData = new FormData();
      formData.append('name', '' + this.form.name.value);
      formData.append('trainer', '' + this.form.trainer.value);
      formData.append('start_date', '' + this.form.start_date.value);
      formData.append('location', '' + this.form.location.value);
      formData.append('duration', '' + this.form.duration.value);
      formData.append('description', '' + this.form.description.value);
      this.trainingService.add(formData)
      .then(resp => {
        this.translate.get('Training.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.trainingForm.reset();
        
        //this.router.navigate(['/roles/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Training.Error')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
