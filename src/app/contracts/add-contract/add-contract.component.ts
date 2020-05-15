import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from 'src/app/_models/contract.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {

  contractForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  contract_name = '';

  constructor(
    private contractService: ContractService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contractForm = this.formBuilder.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    });
  }

  get form() {
    return this.contractForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    this.form.name.setValue(this.contract_name);
    if (this.contractForm.invalid) {
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('display_name', '' + this.form.label.value);
    formData.append('name', '' + this.form.name.value);
    formData.append('description', '' + this.form.description.value);
    this.contractService.add(formData)
      .then(resp => {
        this.translate.get('Role.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.contractForm.reset();
        this.router.navigate(['/contracts/all']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Login.AUTH_LOGIN')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

  computeName(event){
    this.contract_name = event.target.value.replace(/[^A-Z0-9]/ig, "_");
  }

}


