import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Contract } from 'src/app/_models/contract.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-contract',
  templateUrl: './update-contract.component.html',
  styleUrls: ['./update-contract.component.scss']
})
export class UpdateContractComponent implements OnInit {


  selected_users: number[] = [];
  users_tmp: any[] = [];
  loading: boolean = true;
  headers=new HttpHeaders();
  users: User[] = [];
  contractForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  contract: Contract = new Contract();
  public Editor = ClassicEditor;
  myfile:File=null;
  contract_name = '';
  TypeContracts = ['CDI – Contrat à durée indéterminée',
                  'CDD – Contrat à durée déterminée',
                  'CTT – Contrat de travail temporaire ou Intérim',
                  'Contrat d’apprentissage (alternance)',
                  'Contrat de professionnalisation (alternance)',
                  'CUI – Contrat unique d’insertion',
                  'CAE – Contrat d’accompagnement dans l’emploi',
                  'CIE – Contrat initiative emploi'
                ]



  constructor(
    private userService: UserService,
    private contractService: ContractService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {

    this.initForm();
    this.getUsers();
    const contract_id = +this.route.snapshot.paramMap.get("id");
    this.contractService.find(contract_id).then(
      data => {
        this.contract = data;
        this.initForm(true);
        }
     ).catch(
      error => {
        this.translate.get('Contract.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
        this.router.navigate(['/contract/all'])
      }
    )
  }

  initForm(withContract = false) {
    if(withContract) {
      console.log(this.contract)
      this.contractForm = this.formBuilder.group({
        user_id: [this.contract.user_id, [Validators.required]],
        type: [this.contract.type, [Validators.required]],
        names: [this.contract.name],
        title: [this.contract.title],
        terms: [this.contract.terms],
        free_days: [this.contract.free_days],
        start_date: [this.contract.start_date],
        end_date: [this.contract.end_date],
        file: [this.contract.file, [Validators.required]]
      });
    }else {
      this.contractForm = this.formBuilder.group({
        user_id: ['',Validators.required],
        type: ['CDD – Contrat à durée déterminée',Validators.required],
        names: [''],
        title: [''],
        terms: [''],
        free_days: [0],
        start_date: [''],
        end_date: [''] ,
        file: ['',Validators.required]
      });
    }
  }

  public get form() {
    return this.contractForm.controls;
  }


  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }





  onSubmit() {

    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');


    // let now = (new Date());
    // let debut = (new Date(this.form.start_date.value));
    // let end = (new Date(this.form.end_date.value));


    if (this.contractForm.invalid){
      this.translate.get('Contract.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }


    // if(this.form.end_date.value && this.form.start_date.value){

    //   if( debut > end || now > end){
    //     this.translate.get('Contract.SubmitErrordate')
    //       .subscribe(val => this.notifService.danger(val));
    //     return;
    //   }

      this.isLoading = true;
      const formData = new FormData();
      formData.append('user_id', this.form.user_id.value);
      formData.append('type', '' + this.form.type.value);
      formData.append('name', '' + this.form.names.value);
      formData.append('title', '' + this.form.title.value);
      formData.append('terms', '' + this.form.terms.value);
      formData.append('free_days', this.form.free_days.value);
      if (currentDate > this.form.start_date.value) {
        this.translate.get('Form.StartDateError')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
      }
      this.form.start_date.value ? formData.append('start_date', '' + this.form.start_date.value) : null;
      if (this.form.start_date.value >= this.form.end_date.value) {
        this.translate.get('Form.StartDateError')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
      }
      this.form.start_date.value ? formData.append('end_date', '' + this.form.end_date.value) : null;
      formData.append('file', this.myfile);
      this.contractService.update(formData,this.contract.id)
        .then(resp => {
          this.translate.get('Contract.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
          this.isSubmitted = false;
          this.contractForm.reset();
          this.contractForm = this.formBuilder.group({
            user_id: [''],
            type: ['CDD – Contrat à durée déterminée'],
            names: [''],
            title: [''],
            terms: [''],
            free_days: [0],
            start_date: [],
            end_date: [],
            file: []
          });
          //this.router.navigate(['/contracts/all']);
        })
        .catch(err => {
          console.log(err)
          this.translate.get('Contract.CONTRACT_ERROR')
          .subscribe(val => this.notifService.danger(val));
        })
        .finally(() => this.isLoading = false);
      }



  detectfile(event){
    this.myfile=event.target.files[0];
  }

  search(event) {
    this.users = this.users_tmp;
    this.users = this.users_tmp.filter( user => user.login.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  public getUsers() {

    this.loading = true;
    this.userService.all().then(
      response => {
        this.users_tmp = response;
        this.users = response;
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        this.loading = false;
      }
    )
  }

}

