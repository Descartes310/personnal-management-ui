import { Component, OnInit } from '@angular/core';
import { DiciplinaryTeamService } from 'src/app/_services/diciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DiciplinaryTeam } from 'src/app/_models/diciplinary-team.model';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-create-diciplinary-team',
  templateUrl: './create-diciplinary-team.component.html',
  styleUrls: ['./create-diciplinary-team.component.scss']
})
export class CreateDiciplinaryTeamComponent implements OnInit {


  diciplinaryTeamForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  users: any[] = [];
  users_tmp: any[] = [];
  selected_users: number[] = [];


  constructor(
    private templateService: DiciplinaryTeamService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getusers();
    this.diciplinaryTeamForm = this.formBuilder.group({
      label: ['', Validators.required],
    });
  }

  get form() {
    return this.diciplinaryTeamForm.controls;
  }

  getusers() {
    this.userService.all().then(
      response => {
        this.users = response;
        this.users_tmp = response;
      }
    ).catch(
      error => {
        this.notifService.danger('Une erreur s\'est produite');
      }
    );
  }


  selectAllUsers(event: any) {
    this.selected_users = [];
    if (event.target.checked) {
      this.users_tmp.map(
        user => {
          this.selected_users.push(user.id);
        }
      );
    }
  }

  onChecked(user, event) {
    if (event.target.checked) {
      this.selected_users.push(user.id);
    } else {
      this.selected_users.splice(this.selected_users.indexOf(user.id), 1);
    }
  }

  isChecked(id: number) {
    return this.selected_users.includes(id);
  }

  search(event) {
    this.users = this.users_tmp;
    this.users = this.users_tmp.filter( user => user.name.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.diciplinaryTeamForm.invalid) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }


    if (this.selected_users.length <= 0) {
      this.translate.get('diciplinaryTeam.SubmitUsersError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }



    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    formData.append('users', JSON.stringify(this.selected_users));
    this.templateService.add(formData)
      .then(resp => {
        this.translate.get('diciplinaryTeam.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.diciplinaryTeamForm.reset();
        // this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('diciplinaryTeam.DT_ALREADY_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);

}}
