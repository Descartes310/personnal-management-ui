import { Component, OnInit } from '@angular/core';
import { DiciplinaryTeamService } from 'src/app/_services/diciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DiciplinaryTeam } from 'src/app/_models/diciplinary-team.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-diciplinary-team',
  templateUrl: './update-diciplinary-team.component.html',
  styleUrls: ['./update-diciplinary-team.component.scss']
})
export class UpdateDiciplinaryTeamComponent implements OnInit {

  diciplinaryTeamForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  id;

  users: any[] = [];
  users_tmp: any[] = [];
  selected_users: number[] = [];

  assign: DiciplinaryTeam = new DiciplinaryTeam();

  constructor(
    private templateService: DiciplinaryTeamService,
    private userService: UserService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getusers();
    const diciplinaryTeam_id = +this.route.snapshot.paramMap.get('id');
    this.id = diciplinaryTeam_id;
    this.templateService.find(diciplinaryTeam_id).then(
      data => {
        this.assign = data;
        this.initForm(true);
        this.assign.users.map( user => {
          this.selected_users.push(user.id);
        });
      }
    ).catch(
      error => {
        this.translate.get('Role.' + error.error.code)
        .subscribe(val => this.notifService.danger(val));
        // this.router.navigate([''])
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

   initForm(withRole = false) {
    if (withRole) {
      this.diciplinaryTeamForm = this.formBuilder.group({
        label: [this.assign.name, [Validators.required]]
      });
    } else {
      this.diciplinaryTeamForm = this.formBuilder.group({
        label: ['', [Validators.required]]
      });
    }
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


  search(event) {
    this.users = this.users_tmp;
    this.users = this.users_tmp.filter( user => user.name.toLowerCase().includes(event.target.value.toLowerCase()));
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

    this.templateService.update(formData, this.id)
      .then(resp => {
        this.translate.get('diciplinaryTeam.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        // this.diciplinaryTeamForm.reset();
        // this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('diciplinaryTeam.DT_ALREADY_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);

  }
}
