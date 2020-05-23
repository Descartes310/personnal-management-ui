import { Component, OnInit } from '@angular/core';
import { DiciplinaryTeamService } from 'src/app/_services/diciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DiciplinaryTeam } from 'src/app/_models/diciplinary-team.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  assign: DiciplinaryTeam = new DiciplinaryTeam();
  constructor(
    private templateService: DiciplinaryTeamService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const id = +this.route.snapshot.paramMap.get("id");
    this.id=id;
    this.templateService.find(id)
    .then(
      data => {
        this.assign = data;
        //this.assign.slug="";
        this.initForm(true);
      }
    ).catch(
      error => {
        console.log(error)
        this.translate.get('NOT_FOUND_ASSIGNMENT_ID')
        .subscribe(val => this.notifService.danger(val));
        //this.router.navigate([''])
      }
    )

  }

  initForm(withRole = false) {
    if(withRole) {
      this.diciplinaryTeamForm = this.formBuilder.group({
        label: [this.assign.name, [Validators.required]],
      });
    }else {
      this.diciplinaryTeamForm = this.formBuilder.group({
        label: ['', [Validators.required]],
      });
    }
  }


  get form() {
    return this.diciplinaryTeamForm.controls;
  }



  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.diciplinaryTeamForm.invalid) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', '' + this.form.label.value);
    this.templateService.update(formData,this.id)
      .then(resp => {
        this.translate.get('diciplinaryTeam.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.diciplinaryTeamForm.reset();
        //this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('diciplinaryTeam.DT_ALREADY_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);

}

}



