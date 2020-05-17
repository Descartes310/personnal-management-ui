import { Component, OnInit } from '@angular/core';
import { DivisionService } from 'src/app/_services/division.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Division } from 'src/app/_models/division.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-division',
  templateUrl: './update-division.component.html',
  styleUrls: ['./update-division.component.scss']
})
export class UpdateDivisionComponent implements OnInit {

  Division: any[] = [];
  Division_tmp: any[] = [];
  selected_divisions: number[] = [];

  divisionForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  division_name = '';
  divisions:Division [];
  division: Division = new Division();


  constructor(
    private divisionService: DivisionService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    this.getDivions();
    const division_id = +this.route.snapshot.paramMap.get("id");
    this.divisionService.find(division_id).then(
      data => {
        this.division = data;
        this.initForm(true);
       
      }
    ).catch(
      error => {
        this.translate.get('Division.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/divisions/all'])
      }
    )

  }

  initForm(withDivision = false) {
    if(withDivision) {
      console.log(this.division)
      this.divisionForm = this.formBuilder.group({
        name: [this.division.name, [Validators.required]],
        label: [this.division.display_name, [Validators.required]],
        parent_id: '',
        description: [this.division.description]
      });
    }else {
      this.divisionForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        label: ['', [Validators.required]],
        parent_id: '',
        description: ['']
      });
    }
  }

  get form() {
    return this.divisionForm.controls;
  }

  computeName(event){
    this.division_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

  search(event) {
    this.Division = this.Division_tmp;
    this.Division = this.Division_tmp.filter( Division => this.division.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
  }

 /*  onChecked(division, event){
    if(event.target.checked) {
      this.selected_divisions.push(division.id);
    } else {
      this.selected_divisions.splice(this.selected_divisions.indexOf(division.id), 1);
    }
  }

  isChecked(id: number){
    return this.selected_divisions.includes(id);
  }
 */
  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.division_name);
    if (this.divisionForm.invalid) {
      this.translate.get('Division.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('display_name', '' + this.form.label.value);
    formData.append('name', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    formData.append('parent_id', '' + this.form.parent_id.value);
    /* this.selected_divisions.forEach( elt => {
      formData.append('divisions[]', JSON.stringify(elt));
    }); */
    this.divisionService.update(formData, this.division.id)
      .then(resp => {
        this.translate.get('Division.SubmitSuccess1')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.divisionForm.reset();
        this.selected_divisions = [];
        this.router.navigate(['/divisions/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Division.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }
  getDivions() {
    this.divisionService.divisions().then(
      response => {
        this.divisions = response;
        console.log(response)
       
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }
}
