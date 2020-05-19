import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/_services/template.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Template } from 'src/app/_models/template.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-template-update',
  templateUrl: './template-update.component.html',
  styleUrls: ['./template-update.component.scss']
})
export class TemplateUpdateComponent implements OnInit {

  assignmentTypeForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  desc = false;
  assign: Template = new Template();
  editorConfig: AngularEditorConfig = {editable: true,spellcheck: true,height: 'auto',minHeight: '0',maxHeight: 'auto',width: 'auto',minWidth: '0',translate: 'yes',enableToolbar: true,showToolbar: true,placeholder: 'Enter text here...',defaultParagraphSeparator: '',defaultFontName: '',defaultFontSize: '',fonts: [{class: 'arial', name: 'Arial'},{class: 'times-new-roman', name: 'Times New Roman'},{class: 'calibri', name: 'Calibri'},{class: 'comic-sans-ms', name: 'Comic Sans MS'}],customClasses: [{name: 'quote',class: 'quote',},{name: 'redText',class: 'redText'},{name: 'titleText',class: 'titleText',tag: 'h1',},],uploadUrl: '../../../assets/images/templates',uploadWithCredentials: false,sanitize: true,toolbarPosition: 'top',toolbarHiddenButtons: [['bold', 'italic'],['fontSize']]};

  constructor(
    private templateService: TemplateService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.initForm();
    const id = +this.route.snapshot.paramMap.get("id");
    console.log(id);
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
      this.assignmentTypeForm = this.formBuilder.group({
        label: [this.assign.title, [Validators.required]],
        name: [this.assign.type, [Validators.required]],
        description: [this.assign.content,[Validators.required]]
      });
    }else {
      this.assignmentTypeForm = this.formBuilder.group({
        label: ['', [Validators.required]],
        name: ['', [Validators.required]],
        description: ['', [Validators.required]]
      });
    }
  }

  get form() {
    return this.assignmentTypeForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if(this.form.description.value.trim().length==0){
        this.desc=true;
    }
    if (this.assignmentTypeForm.invalid) {
      if(this.form.description.value.trim().length==0 && this.form.label.value.trim().length!=0&&this.form.name.value.trim().length!=0){
          this.translate.get('Templates.contentError')
        .subscribe(val => this.notifService.danger(val));
        return;
      }
      this.translate.get('Templates.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', '' + this.form.label.value);
    formData.append('type', '' + this.form.name.value);
    formData.append('content', '' + this.form.description.value);
    this.templateService.update(formData, this.assign.id)
      .then(resp => {
        this.translate.get('Templates.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.assignmentTypeForm.reset();
        //this.router.navigate(['']);
      })
      .catch(err => {
        this.translate.get('Templates.ASSIGNMENT_NOT_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}

