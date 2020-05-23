import { Component, OnInit } from '@angular/core';
import { DiciplinaryTeamService } from 'src/app/_services/diciplinary-team.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DiciplinaryTeam } from 'src/app/_models/diciplinary-team.model';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';


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
  constructor(
    private templateService: DiciplinaryTeamService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.diciplinaryTeamForm = this.formBuilder.group({
      label: ['', Validators.required],
    });
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
    this.templateService.add(formData)
      .then(resp => {
        this.translate.get('diciplinaryTeam.SubmitSuccess')
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

}}
