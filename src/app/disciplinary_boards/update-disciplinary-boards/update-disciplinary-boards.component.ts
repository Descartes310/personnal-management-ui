import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DisciplinaryBoardsService } from 'src/app/_services/disciplinary_boards.service';
import { DisciplinaryTeamsService } from 'src/app/_services/disciplinary_teams.service';

@Component({
  selector: 'app-update-disciplinary-boards',
  templateUrl: './update-disciplinary-boards.component.html',
  styleUrls: ['./update-disciplinary-boards.component.scss']
})
export class UpdateDisciplinaryBoardComponent implements OnInit {

  formGroup: FormGroup;
  user: any[] = [];
  user_tmp: any[] = [];
  list_team: any[] = [];

  currentBoard: any;

  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  selected_user: any;
  selected_team: any;
  isCheck = false;
  setlected: any;
  board_id: number;

  /**
   * Constructor
   */

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private userService: UserService,
    private notifService: NotifService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private addBoardService: DisciplinaryBoardsService,
    private teamService: DisciplinaryTeamsService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
    this.getListTeam();
    this.board_id = +this.route.snapshot.paramMap.get("id");
  }

  initForm(withRole = false) {
    if (withRole) {
      //chargement du membre a modifier
      this.formGroup = this.formBuilder.group({
        effective_date: [this.currentBoard.effective_date, Validators.required],
        raison: [this.currentBoard.raison, Validators.required],
        decision: [this.currentBoard.decision, Validators.required],
        location: [this.currentBoard.location, Validators.required],
        team: [this.currentBoard.disciplinary_team_id, Validators.required]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        effective_date: ['', [Validators.required]],
        raison: ['', Validators.required],
        decision: ['', Validators.required],
        location: ['', Validators.required],
        team: ['', Validators.required]
      });
    }
  }


  get form() {
    return this.formGroup.controls;
  }

  getListTeam() {
    this.teamService.all().then(
      response => {
        this.list_team = response;
        console.log(response);
        this.addBoardService.find(this.board_id).then(
          data => {
            this.currentBoard = data;
            this.selected_user = data.user;
            console.log(data.user)
            this.initForm(true);
          }
        )
      }
    )
    .catch(error => {
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

  update() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.formGroup.invalid) {
      this.translate.get('DisciplinaryBoards.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('effective_date', '' + this.form.effective_date.value);
    formData.append('decision', '' + this.form.decision.value);
    formData.append('location', '' + this.form.location.value);
    formData.append('raison', '' + this.form.raison.value);
    formData.append('disciplinary_team_id', '' + this.form.team.value);
    formData.append('user_id', '' + this.selected_user.id);
    console.log(this.currentBoard.id);
    this.addBoardService.update(formData, this.currentBoard.id)
      .then(resp => {
        this.translate.get('DisciplinaryBoards.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isLoading = false;
        this.formGroup.reset();
        this.isSubmitted = false;
        this.router.navigate(['/disciplinaryBoards/all']);
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

  onChecked(user, event) {
    this.selected_user = user;
    this.isCheck = true;
  }

  getTeam(team) {
    this.selected_team = team;
  }

}
