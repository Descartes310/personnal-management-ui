import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/_services/training.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Training } from 'src/app/_models/training.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DivisionService } from 'src/app/_services/division.service';

@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.scss']
})
export class UpdateTrainingComponent implements OnInit {

  trainingForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  divisions: any[];
  isSubmitted = false;
  training_name = '';
  is_online = false;
  training: Training = new Training();
  constructor(
    private trainingService: TrainingService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private divisionService: DivisionService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getDivision();
    const training_id = +this.route.snapshot.paramMap.get("id");
    this.trainingService.find(training_id).then(
      data => {
        console.log(data)
        this.training = data;
        this.initForm(true);
        console.log(this.training)
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('Training.TRAINING_NOT_FOUND')
        .subscribe(val => this.notifService.danger(val));
      }
    )

  }

  initForm(withTraining = false) {
    if(withTraining) {
      console.log(this.training)
      this.training_name = this.training.slug;
      this.is_online = this.training.is_online ? true : false;
      this.trainingForm = this.formBuilder.group({
        name: [this.training.name, [Validators.required]],
        slug: [this.training.slug, [Validators.required]],
        division_id: [this.training.division.id, [ Validators.required]],
        trainer: [this.training.trainer, [Validators.required]],
        start_date: [this.training.start_date, [Validators.required]],
        location: [this.training.location, [Validators.required]],
        duration: [this.training.duration, [Validators.required]],
        description: [this.training.description]
      });
    }else {
      this.trainingForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        division_id: ['', [Validators.required]],
        slug: ['', [Validators.required]],
        trainer: ['', [Validators.required]],
        start_date: ['', [Validators.required]],
        location: ['', [Validators.required]],
        duration: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  get form() {
    return this.trainingForm.controls;
  }

  computeName(event){
    this.training_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  get duration() {
    return this.trainingForm.get('duration');
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
  }

  public getDivision() {
    this.divisionService.all().then(
      response => {
        this.divisions = response;
      }
    ).catch(
      error => {
        this.translate.get('User.LoadingError')
          .subscribe(val => this.notifService.danger(val));
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    console.log(this.trainingForm);
    if (this.trainingForm.invalid) {
      this.translate.get('Training.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    console.log("console log");
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.name.value);
    formData.append('trainer', '' + this.form.trainer.value);
    formData.append('start_date', '' + this.form.start_date.value);
    formData.append('location', '' + this.form.location.value);
    formData.append('duration', '' + this.form.duration.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('division_id', '' + this.form.division_id.value);
    formData.append('is_online', this.is_online ? '1' : '0');
    console.log("tet 1");
    console.log(this.form.division_id.value);
    
    this.trainingService.update(formData, this.training.id)
      .then(resp => {
        this.translate.get('Training.SubmitSuccess1')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.trainingForm.reset();
        this.router.navigate(['/trainings/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Training.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}
