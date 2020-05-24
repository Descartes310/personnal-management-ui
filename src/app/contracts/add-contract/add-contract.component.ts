import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/_services/contract.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.scss']
})
export class AddContractComponent implements OnInit {


  selected_users: number[] = [];
  users_tmp: User[] = [];
  headers=new HttpHeaders();
  users: User[] = [];
  loading: boolean = true;
  contractForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  public Editor = ClassicEditor;
  myfile:File=null;

  TypeContracts = ['CDI – Contrat à durée indéterminée',
                  'CDD – Contrat à durée déterminée',
                  'CTT – Contrat de travail temporaire ou Intérim',
                  'Contrat d’apprentissage (alternance)',
                  'Contrat de professionnalisation (alternance)',
                  'CUI – Contrat unique d’insertion',
                  'CAE – Contrat d’accompagnement dans l’emploi',
                  'CIE – Contrat initiative emploi'
                ]



                USERS = [
                  {
                    "id": 1,
                    "name": "Leanne Graham",
                    "email": "sincere@april.biz",
                    "phone": "1-770-736-8031 x56442"
                  },
                  {
                    "id": 2,
                    "name": "Ervin Howell",
                    "email": "shanna@melissa.tv",
                    "phone": "010-692-6593 x09125"
                  },
                  {
                    "id": 3,
                    "name": "Clementine Bauch",
                    "email": "nathan@yesenia.net",
                    "phone": "1-463-123-4447",
                  },
                  {
                    "id": 4,
                    "name": "Patricia Lebsack",
                    "email": "julianne@kory.org",
                    "phone": "493-170-9623 x156"
                  },
                  {
                    "id": 5,
                    "name": "Chelsey Dietrich",
                    "email": "lucio@annie.ca",
                    "phone": "(254)954-1289"
                  },
                  {
                    "id": 6,
                    "name": "Mrs. Dennis",
                    "email": "karley@jasper.info",
                    "phone": "1-477-935-8478 x6430"
                  }
                ];


  constructor(
    private http:HttpClient,
    private userService: UserService,
    private contractService: ContractService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) {
      this.headers.append('enctype','multipart/form-data');
      this.headers.append('Content-type','application/json');
    }

  ngOnInit() {
    this.getUsers();
    this.contractForm = this.formBuilder.group({
      user_id: ['',Validators.required],
      type: ['CDD – Contrat à durée déterminée',Validators.required],
      names: [''],
      title: [''],
      terms: [''],
      free_days: [0],
      start_date: [],
      end_date: [] ,
      file: ['',Validators.required]
    });
  }

  get form() {
    return this.contractForm.controls;
  }

  onSubmit() {

    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false;
    let pipe = new DatePipe('en-US');
    let date = new Date();
    let currentDate = pipe.transform(date, 'yyyy-MM-dd');

    if (this.contractForm.invalid){
      this.translate.get('Contract.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }


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
        this.translate.get('Form.EndDateError')
        .subscribe(val => this.notifService.danger(val));
        this.isLoading = false;
        return;
      }
      this.form.start_date.value ? formData.append('end_date', '' + this.form.end_date.value) : null;
      formData.append('file', this.myfile);
      this.contractService.add(formData)
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
        })
        .catch(err => {
          console.log(err)
          this.translate.get('Contract.CONTRACT_ERROR')
          .subscribe(val => this.notifService.danger(val));
        })
        .finally(() => this.isLoading = false);
      }



    public onReady( editor ) {
        editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    }

  public getUsers() {

    this.loading = true;
    this.userService.all().then(
      response => {
       // this.users = [];
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



  detectfile(event){
    this.myfile=event.target.files[0];
  }

  search(event) {
    this.users = this.users_tmp;
    this.users = this.users_tmp.filter( user => user.login.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}







