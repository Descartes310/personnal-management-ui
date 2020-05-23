import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assignment } from 'src/app/_models/assignment.model';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.scss']
})

export class UpdateAssignmentComponent implements OnInit {

  type_assignment: any[] = [];
  users: any[] = [];

  assignmentForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;

  assignment: Assignment = new Assignment();

  constructor(
    private assignmentService: AssignmentService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getUsers();
    this.getTypeAssignment();
    const assignment_id = +this.route.snapshot.paramMap.get("id");
    this.assignmentService.find(assignment_id).then(
      data => {
        this.assignment = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('Assignment.' + error.error.code)
          .subscribe(val => this.notifService.danger(val));
      }
    )

  }

  initForm(withAssignment = false) {
    if (withAssignment) {
      this.assignmentForm = this.formBuilder.group({
        user_assignment: [this.assignment.user_id, Validators.required],
        type_assignment: [this.assignment.assignment_type_id, Validators.required],
        destination: [this.assignment.destination, Validators.required],
        signature_date: [this.assignment.signature_date, Validators.required],
        installation_date: [this.assignment.installation_date, Validators.required],
        raison: [this.assignment.raison, Validators.required],
        description: [this.assignment.description]
      });
    } else {
      this.assignmentForm = this.formBuilder.group({
        user_assignment: ['', Validators.required],
        type_assignment: ['', Validators.required],
        destination: ['', Validators.required],
        signature_date: ['', Validators.required],
        installation_date: ['', Validators.required],
        raison: ['', Validators.required],
        description: ['']
      });
    }
  }

  get form() {
    return this.assignmentForm.controls;
  }

  getTypeAssignment() {
    this.assignmentService.typeAssignment().then(
      response => {
        this.type_assignment = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }
  getUsers() {
    this.assignmentService.users().then(
      response => {
        this.users = response;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.assignmentForm.invalid) {
      this.translate.get('Assignment.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('user_id', '' + this.form.user_assignment.value);
    formData.append('assignment_type_id', '' + this.form.type_assignment.value);
    formData.append('destination', '' + this.form.destination.value);
    formData.append('signature_date', '' + this.form.signature_date.value);
    formData.append('installation_date', '' + this.form.installation_date.value);
    formData.append('raison', '' + this.form.raison.value);
    formData.append('description', '' + this.form.description.value);

    this.assignmentService.update(formData, this.assignment.id)
      .then(resp => {
        this.translate.get('Assignment.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.assignmentForm.reset();
        this.router.navigate(['/assignments/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Assignment.' + err.error.code)
          .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}
