import { Component, OnInit } from '@angular/core';
import { TrainingService} from 'src/app/_services/training.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Training} from 'src/app/_models/training.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {


  trainingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  training_name = '';
  isvalidDate=true;
  is_online = false;
  public errorMessages: any = {};
 
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
      is_online: ['']
    });

    this.errorMessages = {
      duration: [
        { type: 'required', message: '' },
        { type: 'min', message: '' },
        { type: 'max', message: '' },
      ]
    }
    this.getDurationErrorMessages();
  }

  
  public  getDurationErrorMessages() {
    this.translate.get('Training.ErrorMessages.Duration').subscribe(val => {
      this.errorMessages.duration[0].message = val[0];
      this.errorMessages.duration[1].message = val[1];
      this.errorMessages.duration[2].message = val[2];
    });
  }
  get duration() {
    return this.trainingForm.get('duration');
  }

  get form() {
    return this.trainingForm.controls;
  }

  computeName(event){
    this.training_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }
  
  public checkDuration(event) {
    let duration = parseInt(event.target.value);

    if(duration < 1) {
      this.duration.setValue(1);
    }
    if(duration > 100) {
      this.duration.setValue(100);
    }
  }

  onChecked(event){
    this.is_online = event.target.checked; 
    alert(this.is_online)   
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.trainingForm.invalid) {
      this.translate.get('Training.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
  
    this.isLoading = true;
      const formData = new FormData();
      formData.append('name', '' + this.form.name.value.trim());
      formData.append('trainer', '' + this.form.trainer.value.trim());
      if (currentDate >= this.form.start_date.value) {
        this.translate.get('Form.StartDateError')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
      }
      formData.append('start_date', '' + this.form.start_date.value);
      formData.append('location', '' + this.form.location.value.trim());
      formData.append('duration', '' + this.form.duration.value);
      formData.append('description', '' + this.form.description.value.trim());
      formData.append('is_online', this.is_online ? '1' : '0');
      this.trainingService.add(formData)
      .then(resp => {
        this.translate.get('Training.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.trainingForm.reset();
        
        //this.router.navigate(['/trainings/all']);
      })
      .catch(error => {
        console.log(error);
        if(error.error.errors.duration)
        this.translate.get('Training.' + error.error.code + '.Duration', { data: this.form.duration })
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
