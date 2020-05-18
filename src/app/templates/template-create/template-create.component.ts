import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/_services/template.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/_models/role.model';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit {

  templateForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  editorConfig: AngularEditorConfig = {editable: true,spellcheck: true,height: '1000',minHeight: '1000',maxHeight: 'auto',width: 'auto',minWidth: '0',translate: 'yes',enableToolbar: true,showToolbar: true,placeholder: 'Enter text here...',defaultParagraphSeparator: '',defaultFontName: '',defaultFontSize: '',fonts: [{class: 'arial', name: 'Arial'},{class: 'times-new-roman', name: 'Times New Roman'},{class: 'calibri', name: 'Calibri'},{class: 'comic-sans-ms', name: 'Comic Sans MS'}],customClasses: [{name: 'quote',class: 'quote',},{name: 'redText',class: 'redText'},{name: 'titleText',class: 'titleText',tag: 'h1',},],uploadUrl: '../../../assets/images/templates',uploadWithCredentials: false,sanitize: true,toolbarPosition: 'top',toolbarHiddenButtons: [['bold', 'italic'],['fontSize']]};

  constructor(
    private templateService: TemplateService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.templateForm = this.formBuilder.group({
      label: ['', Validators.required],
      name: ['', Validators.required],
      description: ['',Validators.required],
    });
  }

  get form() {
    return this.templateForm.controls;
  }



  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.templateForm.invalid) {
      if(this.form.description.value.trim().length==0 && this.form.label.value.trim().length!=0&&this.form.name.value.trim().length!=0){
          this.translate.get('Templates.contentError')
        .subscribe(val => this.notifService.danger(val));
        return;
      }
      this.translate.get('Role.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }
    this.isLoading = true;
    const formData = new FormData();
    formData.append('title', '' + this.form.label.value);
    formData.append('type', '' + this.form.name.value);
    formData.append('content', '' + this.form.description.value);
    this.templateService.add(formData)
      .then(resp => {
        this.translate.get('Templates.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.templateForm.reset();
        //this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('Templates.TEMPLATE_ALREADY_EXIST')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}