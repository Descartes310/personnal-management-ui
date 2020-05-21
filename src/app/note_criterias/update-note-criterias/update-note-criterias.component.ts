import { Component, OnInit } from '@angular/core';
import { NoteCriteriaService } from 'src/app/_services/note-criteria.service';
import { NotifService } from 'src/app/_services/notif.service';
import {NoteCriteria} from 'src/app/_models/note_criterias.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-note-criterias',
  templateUrl: './update-note-criterias.component.html',
  styleUrls: ['./update-note-criterias.component.scss']
})
export class UpdateNoteCriteriasComponent implements OnInit {

  noteCriteriaForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  note_name = '';
  note_criteria: NoteCriteria = new NoteCriteria();


  constructor(
    private NoteCriteriaService: NoteCriteriaService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const note_id = +this.route.snapshot.paramMap.get("id");
    this.NoteCriteriaService.find(note_id)
      .then(
        data => {
          this.note_criteria = data;
          //this.vacation.slug="";
          this.initForm(true);
        }
      ).catch(
        error => {
          this.translate.get('NoteCriteria.NOTECRITERIA_NOT_FOUND')
          .subscribe(val => this.notifService.danger(val));
        }
      )

  }

  initForm(withNote = false) {
    if (withNote) {
      this.noteCriteriaForm = this.formBuilder.group({
        name: [this.note_criteria.name, [Validators.required]],
        slug: [this.note_criteria.slug, [Validators.required]], 
        max: [this.note_criteria.max_rate, [Validators.required]],
        min: [this.note_criteria.min_rate, [Validators.required]],
        weights: [this.note_criteria.weight, [Validators.required]],
        description: [this.note_criteria.description]
      });
    } else {
      this.noteCriteriaForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        slug: ['', [Validators.required]], 
        max: ['', [Validators.required]],
        min: ['', [Validators.required]],
        weights: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  
  get form() {
    return this.noteCriteriaForm.controls;
  }

  computeName(event) {
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
    this.isLoading = false;
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
    formData.append('name', '' + this.form.name.value);
    formData.append('slug', '' + this.form.slug.value);
    formData.append('max_rate', '' + this.form.max.value);
    formData.append('min_rate', '' + this.form.min.value);
    formData.append('weight', '' + this.form.weights.value);
    formData.append('description', '' + this.form.description.value);
    this.NoteCriteriaService.update(formData, this.note_criteria.id)
      .then(resp => {
        this.translate.get('NoteCriteria.UpdateSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.noteCriteriaForm.reset();
        this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('NoteCriteria.' + err.error.code)
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
}



