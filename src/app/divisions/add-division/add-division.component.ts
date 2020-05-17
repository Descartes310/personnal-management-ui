import { Component, OnInit } from '@angular/core';

import { DivisionService } from 'src/app/_services/division.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Division } from 'src/app/_models/division.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {

  
  
    RechDivisions: any[] = [];
    RechDivisions_tmp: any[] = [];
    selected_divisions: number[] = [];
    divisions:Division[];
    divisionForm: FormGroup;
    isLoading = false;
    isError = false;
    isSuccess = false;
    isSubmitted = false;
    division_name = '';
  
    constructor(
      private divisionService: DivisionService,
      private notifService: NotifService,
      private formBuilder: FormBuilder,
      private translate: TranslateService,
      private router: Router,
    ) { }
  
    ngOnInit() {
      this.getDivions();
  
      this.divisionForm = this.formBuilder.group({
        label: ['', Validators.required],
        name: ['', Validators.required],
        parent_id:'',
        description: ['']
      });
    }
  
    get form() {
      return this.divisionForm.controls;
    }
  
    computeName(event){
      this.division_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
    }
  
    search(event) {
      this.RechDivisions = this.RechDivisions_tmp;
      this.RechDivisions = this.RechDivisions_tmp.filter( division => division.display_name.toLowerCase().includes(event.target.value.toLowerCase()));
    }
  
    selectAllDivision(event: any){
      this.selected_divisions = [];
      if(event.target.checked) {
        this.RechDivisions_tmp.map(
          division => {
            this.selected_divisions.push(division.id)
          }
        )
      }
    }
  
    onChecked(division, event){
      if(event.target.checked) {
        this.selected_divisions.push(division.id);
      } else {
        this.selected_divisions.splice(this.selected_divisions.indexOf(division.id), 1);
      }
    }
  
    isChecked(id: number){
      return this.selected_divisions.includes(id);
    }
  
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
      console.log("parent id:"+this.form.parent_id.value)
      this.divisionService.add(formData)
        .then(resp => {
          console.log(resp)
          this.translate.get('Division.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
          this.isSubmitted = false;
          this.divisionForm.reset();
        //  this.selected_divisions = [];
          
        })
        .catch(err => {
          console.log(err)
          this.translate.get('Division.DIVISION_ALREADY_EXISTS')
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
  


