import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/_services/user.service';
import { NotecriteriasService } from '../_services/notecriterias.service';
import { UserNoteCriteriasService } from '../_services/user-note-criterias.service';

@Component({
  selector: 'app-add-user-note-criterias',
  templateUrl: './add-user-note-criterias.component.html',
  styleUrls: ['./add-user-note-criterias.component.scss']
})
export class AddUserNoteCriteriasComponent implements OnInit {

  formGroup: FormGroup;
  user: any[] = [];
  user_tmp: any[] = [];
  list_note: any[] = [];
  selected_user_note: any;

  isLoading = false;
  isSubmitted = false;

  selected_user: any;
  selected_note: any;
  isCheck = false;
  score_error = false;
  isUpdate = false;

  /**
   * Constructor
   */

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notifService: NotifService,
    private translate: TranslateService,
    private noteService: NotecriteriasService,
    private router: Router,
    private addUserNoteCriterias: UserNoteCriteriasService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.getNoteCriterias();
    this.formGroup = this.formBuilder.group({
      appreciation: ['', Validators.required],
      description: ['', Validators.required],
      score: ['', Validators.required],
      note_criteria_id: ['', Validators.required]
    });
  }

  getNoteCriterias() {
    this.noteService.all().then(
      response => {
        this.list_note = response;
      }
    )
      .catch(
        error => {
          this.notifService.danger("Une erreur s'est produite");
        }
      )
  }

  get form() {
    return this.formGroup.controls;
  }


  getUsers() {
    this.userService.allUsers().then(
      response => {
        this.user = response;
        this.user_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  add(){
    if(this.isUpdate){
      this.updateUser();
    }else{
      this.addUser();
    }
  }

  addUser() {
    this.isSubmitted = true;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.formGroup.invalid) {
      this.translate.get('UserNoteCriteria.Error')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    if (this.selected_note.max_rate < this.form.score.value || this.selected_note.min_rate > this.form.score.value) {
      this.translate.get('UserNoteCriteria.Error')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    if (!this.isCheck) {
      this.translate.get('DisciplinaryBoards.SelectMember')
        .subscribe(val => this.notifService.danger(val));
      this.isLoading = false;
      return;
    }


    formData.append('user_id', '' + this.selected_user.id);
    formData.append('note_criteria_id', '' + this.form.note_criteria_id.value);
    formData.append('score', '' + this.form.score.value);
    formData.append('appreciation', '' + this.form.appreciation.value);
    formData.append('description', '' + this.form.description.value);

    this.addUserNoteCriterias.add(formData)
      .then(resp => {
        this.translate.get('UserNoteCriteria.Success')
          .subscribe(val => this.notifService.success(val));
        this.formGroup.reset();
        this.isSubmitted = false;
        this.isLoading = false;
        this.selected_user = null;
        this.router.navigate(['/roles/all']);
      })
      .catch(error => {
        console.log(error)
        this.translate.get('UserNoteCriteria.Error')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  search(event) {
    this.user = this.user_tmp;
    this.user = this.user_tmp.filter(user => (user.first_name+' '+user.last_name).toLowerCase().includes(event.target.value.toLowerCase()));
  }

  onChecked(user, event) {
    this.selected_user = user;
    this.isCheck = true;

    if (this.selected_note != null) {
      this.update();
    }else{
      this.vider();
    }
  }

  updateUser(){
    this.isSubmitted = true;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.formGroup.invalid) {
      this.translate.get('UserNoteCriteria.Error')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    if (this.selected_note.max_rate < this.form.score.value || this.selected_note.min_rate > this.form.score.value) {
      this.notifService.danger(`Le score doit etre compris entre ${this.selected_note.min_rate} et ${this.selected_note.max_rate}`);
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.selected_user.id);
    formData.append('note_criteria_id', '' + this.form.note_criteria_id.value);
    formData.append('score', '' + this.form.score.value);
    formData.append('appreciation', '' + this.form.appreciation.value);
    formData.append('description', '' + this.form.description.value);
    this.addUserNoteCriterias.update(formData, this.selected_user_note.id)
      .then(resp => {
        this.translate.get('UserNoteCriteria.Success')
          .subscribe(val => this.notifService.success(val));
        this.formGroup.reset();
        this.isSubmitted = false;
        this.isLoading = false;
        this.selected_user = null;
        this.router.navigate(['/roles/all']);
      })
      .catch(error => {
        console.log(error)
        this.translate.get('UserNoteCriteria.Error')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
      this.isUpdate = false;
  }

  setNote(event) {
    this.selected_note = this.list_note.filter(note => note.id == event.target.value)[0];
    if (this.form.score.value != "")
      this.verify();
    
    if (this.selected_user != null) {
      this.update();
    }else{
      this.vider();
    }
  }

  verify() {
    let value = this.form.score.value;
    if (this.selected_note != null) {
      if (this.selected_note.max_rate < value || this.selected_note.min_rate > value) {
        this.score_error = true;
        this.notifService.danger(`Le score doit etre compris entre ${this.selected_note.min_rate} et ${this.selected_note.max_rate}`);
      } else {
        this.score_error = false;
      }
    }
    
  }

  update() {
    this.initForm();
  }

  initForm() {
    this.isLoading = true;
    this.addUserNoteCriterias.all().then(
      response => {
        for (let not of response) {
          if (not.note_criteria_id == this.selected_note.id && not.user_id == this.selected_user.id) {
            this.formGroup = this.formBuilder.group({
              appreciation: [not.appreciation, Validators.required],
              description: [not.description, Validators.required],
              score: [not.score, Validators.required],
              note_criteria_id: [not.note_criteria_id, Validators.required]
            });
            this.isUpdate = true;
            this.selected_user_note = not;
            this.isLoading = false;
            return;
          }else{
            this.vider();
          }
          this.isLoading = false;
        }
        this.isLoading = false;
      }
    )
    .catch(
      error => {
        console.log(error)
        this.vider();
        this.isLoading = false;
      }
    );
    this.isLoading = false;
  }

  vider(){
    this.isUpdate = false;
    this.selected_user = null;
    this.isLoading = false;
    this.form.score.setValue(0);
    this.form.appreciation.setValue('');
    this.form.description.setValue('');
  }


}
