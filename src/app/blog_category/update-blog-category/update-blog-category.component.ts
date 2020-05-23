import { Component, OnInit } from '@angular/core';
import { BlogcatService } from 'src/app/_services/blogcat.service';
import { NotifService } from 'src/app/_services/notif.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogCat } from 'src/app/_models/blogcat.model';

@Component({
  selector: 'app-update-blog-category',
  templateUrl: './update-blog-category.component.html',
  styleUrls: ['./update-blog-category.component.scss']
})
export class UpdateBlogCategoryComponent implements OnInit {
  blogcatForm: FormGroup;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  blogcat: BlogCat = new BlogCat();

  constructor(
    private blogcatService: BlogcatService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router, 
  ) { }
  
  ngOnInit() {
    this.initForm();
    const blogcat_id = +this.route.snapshot.paramMap.get("id");
    this.blogcatService.find(blogcat_id).then(
      data => {
        console.log(data)
        this.blogcat = data;
        this.initForm(true);
        console.log(this.blogcat)
      }
    ).catch(
      error => {
        console.log(error);
        this.translate.get('BlogCat.BC_NOT_FOUND')
        .subscribe(val => this.notifService.danger(val));
        //this.router.navigate(['/home'])
      }
    )

  }

  initForm(withBlogCat = false) {
    if(withBlogCat) {
      console.log(this.blogcat)
      this.blogcatForm = this.formBuilder.group({
        title: [this.blogcat.title, [Validators.required]],
        description: [this.blogcat.description]
      });
    }else {
      this.blogcatForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        description: ['']
      });
    }
  }

  get form() {
    return this.blogcatForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.isError = false;
    this.isSuccess = false;
    this.isLoading = false
    // Si la validation a echoué, on arrete l'execution de la fonction
    if (this.blogcatForm.invalid) {
      this.translate.get('BlogCat.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }

    this.isLoading = true;
      const formData = new FormData();
      formData.append('title', '' + this.form.title.value);
      formData.append('description', '' + this.form.description.value);

    this.blogcatService.update(formData, this.blogcat.id)
      .then(resp => {
        this.translate.get('BlogCat.UpdateSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.blogcatForm.reset();
        this.router.navigate(['/blog-category/add']);
      })
      .catch(err => {
        console.log(err)
        this.translate.get('BlogCat.'+err.error.code)
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(() => this.isLoading = false);
  }

}