import { Component, OnInit } from '@angular/core';
import { NoteCriteriaService } from 'src/app/_services/note-criteria.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {NoteCriteria} from 'src/app/_models/note_criterias.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-note-criterias',
  templateUrl: './add-note-criterias.component.html',
  styleUrls: ['./add-note-criterias.component.scss']
})
export class AddNoteCriteriasComponent implements OnInit {

  noteCriteriaForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  note_name = '';

  constructor(
    private NoteCriteriaService: NoteCriteriaService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.noteCriteriaForm = this.formBuilder.group({
      name: ['', Validators.required],
      slug: ['', Validators.required], 
      max: ['', Validators.required],
      min: ['', Validators.required],
      weights: ['', Validators.required],
      description: ['']
    });
  }  

  get form() {
    return this.noteCriteriaForm.controls;
  }

  computeName(event){
    this.note_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  public checkNoteMax(event) {
    let noteMax = parseInt(event.target.value);
    if(noteMax > 100) {
      this.form.max.setValue(100);
    }
  }  

  public checkweight(event) {
    let weight = parseInt(event.target.value);
    if(weight > 100) {
      this.form.weights.setValue(100);
    }
    
  } 

  public checkNoteMin(event) {
    let noteMin = parseInt(event.target.value);
    if(noteMin > 100) {
      this.form.min.setValue(100);
    }
  } 
  
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
   this.form.name.setValue(this.note_name);

    if (this.form.invalid) {
      this.translate.get('NoteCriteria.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return; 
    }
    if (this.form.min.value > this.form.max.value) {
      this.translate.get('NoteCriteria.noteMinsup')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    console.log(this.form)
    formData.append('name', '' + this.form.name.value);
    formData.append('slug', '' + this.form.slug.value);
    formData.append('max_rate', '' + this.form.max.value);
    formData.append('min_rate', '' + this.form.min.value);
    formData.append('weight', '' + this.form.weights.value);
    formData.append('description', '' + this.form.description.value);
    
    this.NoteCriteriaService.add(formData)
    .then(resp => {
      console.log(resp )
      this.translate.get('NoteCriteria.SubmitSuccess')
      .subscribe(val => this.notifService.success(val));
      this.isSubmitted = false;
      this.noteCriteriaForm.reset();
    })
    .catch(err => {
      this.translate.get('NoteCriteria.NOTE_CRITERIA_SLUG_ALREADY_EXIST')
      .subscribe(val => this.notifService.danger(val));
    })
    .finally(() => this.isLoading = false);
  }

    
}  

