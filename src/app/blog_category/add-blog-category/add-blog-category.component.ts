import { Component, OnInit } from '@angular/core';
import { BlogcatService } from 'src/app/_services/blogcat.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog-category',
  templateUrl: './add-blog-category.component.html',
  styleUrls: ['./add-blog-category.component.scss']
})
export class AddBlogCategoryComponent implements OnInit {
  blogCatForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  //blogcat_name = '';

  constructor(
      private blogcatService: BlogcatService,
      private notifService: NotifService,
      private formBuilder: FormBuilder,
      private translate: TranslateService,
      private router: Router,
  ) { }

    ngOnInit() {
      this.blogCatForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['']
      });
    }
  
    get form() {
      return this.blogCatForm.controls;
    }

    onSubmit() {
      this.isSubmitted = true;
      this.isError = false;
      this.isSuccess = false;
      this.isLoading = false
      // Si la validation a echoué, on arrete l'execution de la fonction
      //this.form.name.setValue(this.blogcat_name);
      if (this.blogCatForm.invalid) {
        this.translate.get('BlogCat.SubmitError')
          .subscribe(val => this.notifService.danger(val));
        return;
      }
  
      this.isLoading = true;
      const formData = new FormData();
      formData.append('title', '' + this.form.title.value);
      formData.append('description', '' + this.form.description.value);

      this.blogcatService.add(formData)
        .then(resp => {
          this.translate.get('BlogCat.SubmitSuccess')
          .subscribe(val => this.notifService.success(val));
          this.isSubmitted = false;
          this.blogCatForm.reset();
        })
        .catch(err => {
          console.log(err)
          alert("incorrect");
          this.translate.get('BlogCat.SubmitError')
          .subscribe(val => this.notifService.danger(val));
        })
        .finally(() => this.isLoading = false);
        alert("fin");
    }
  
  }
  
