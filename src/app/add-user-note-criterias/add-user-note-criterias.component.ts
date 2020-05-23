import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifService } from 'src/app/_services/notif.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DisciplinaryBoardsService } from 'src/app/_services/disciplinary_boards.service';
import { UserService } from 'src/app/_services/user.service';
import { DisciplinaryTeamsService } from 'src/app/_services/disciplinary_teams.service';

@Component({
  selector: 'app-add-user-note-criterias',
  templateUrl: './add-user-note-criterias.component.html',
  styleUrls: ['./add-user-note-criterias.component.scss']
})
export class AddUserNoteCriteriasComponent implements OnInit {

  formGroup: FormGroup;
  user: any[] = [];
  user_tmp: any[] = [];
  list_team: any[] = [];

  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  selected_user:any;
  selected_team : any;
  isCheck = false;
  setlected : any;

  /**
   * Constructor
   */

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router,
    private addBoardService: DisciplinaryBoardsService,
    private teamService: DisciplinaryTeamsService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.getListTeam();
    this.formGroup = this.formBuilder.group({
      effective_date: ['', Validators.required],
      raison: ['', Validators.required],
      decision: ['', Validators.required],
      location: ['', Validators.required],
      team: ['', Validators.required]
    });
  }


  get form() {
    return this.formGroup.controls;
  }

  getListTeam(){
    this.teamService.all().then(
      response =>{
        console.log(response);
        this.list_team = response;
        console.log(response);
      }
    )
    .catch(error =>{
      this.notifService.danger("Une erreur s'est produite");
    });
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

  add() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.formGroup.invalid) {
      this.translate.get('DisciplinaryBoards.SubmitError')
        .subscribe(val => this.notifService.danger(val));
        console.log("testeffge");
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    console.log(this.form.effective_date.value);
    console.log(this.form.team.value);
    if(!this.isCheck){
      this.translate.get('DisciplinaryBoards.SelectMember')
      .subscribe(val => this.notifService.danger(val));
      this.isLoading = false;
    return;
    }
    formData.append('effective_date', '' + this.form.effective_date.value);
    formData.append('decision', '' + this.form.decision.value);
    formData.append('location', '' + this.form.location.value);
    formData.append('raison', '' + this.form.raison.value);
    formData.append('disciplinary_team_id', '' + this.form.team.value);
    formData.append('user_id', '' + this.selected_user.id);

    this.addBoardService.add(formData)
      .then(resp => {
        this.translate.get('DisciplinaryBoards.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.formGroup.reset();
        this.isSubmitted = false;
        this.isLoading = false;
        // this.router.navigate(['/roles/all']);
      })
      .catch(error => {
        console.log(error)
        this.translate.get('DisciplinaryBoards.Created_Error')
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  search(event) {
    this.user = this.user_tmp;
    this.user = this.user_tmp.filter(user => user.login.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  onChecked(user, event){
      this.selected_user = user;
      this.isCheck= true;
  }

 getTeam(team){
  this.selected_team = team;
  console.log(team);
 } 


}
