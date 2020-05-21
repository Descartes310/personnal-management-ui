import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogPostService } from 'src/app/_services/blog-post.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { BlogCategoryService } from 'src/app/_services/blog-category.service';
import { BlogCategory } from 'src/app/_models/blog.category.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.scss']
})
export class AddBlogPostComponent implements OnInit {

  user;
  blog;

  blog_categories: any[] = [];
  blog_categories_tmp: any[] = [];

  blogPostForm: FormGroup;
  headers=new HttpHeaders();
  loading = true;
  isLoading = false;
  isError = false;
  isSuccess = false;
  isSubmitted = false;
  public Editor = ClassicEditor;
  image:File=null;


  constructor(
    private http:HttpClient,
    private authService: AuthService,
    private blogCategoryService:BlogCategoryService,
    private blogPostService: BlogPostService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,

  ) {
    // this.headers.append('enctype','multipart/form-data');
    // this.headers.append('Content-type','application/json');

  }

  ngOnInit() {
    this.blog = this.getBlogCategories();
    this.user = this.authService.getUser();
    this.blogPostForm = this.formBuilder.group({
      blog_category_id:['',Validators.required],
      title: ['',Validators.required],
      content:['',Validators.required],
      image: ['']
    });
  }

  get form() {
    return this.blogPostForm.controls;
  }


  getBlogCategories() {
    this.blogPostService.blogCategories().then(
      response => {
        this.blog_categories = response.data;
        this.blog_categories_tmp = response.data;
        console.log(response.data);
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
    this.isLoading = false;

    if (this.blogPostForm.invalid){
      this.translate.get('Contract.SubmitError')
        .subscribe(val => this.notifService.danger(val));
      return;
    }


      this.isLoading = true;
      const formData = new FormData();
      formData.append('user_id', this.user.id);
      formData.append('blog_category_id', this.form.blog_category_id.value);
      formData.append('title', '' + this.form.title.value);
      formData.append('content', '' + this.form.content.value);
      formData.append('image',this.image);
      console.log(this.user.id);
      console.log(this.form.title.value);
      console.log(this.form.content.value);
      console.log(this.form.blog_category_id.value);
      this.blogPostService.add(formData)
      .then(resp => {
        this.translate.get('License.SubmitSuccess')
        .subscribe(val => this.notifService.success(val));
        this.isSubmitted = false;
        this.blogPostForm.reset();
      })
      .catch(err => {
        console.log(err)
        this.translate.get('License.SubmitErrorLicense')
        .subscribe(val => this.notifService.danger(val));
      })
      .finally(
        () => this.isLoading = false
        );
      }



  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  detectimage(event) {
    this.image = event.target.files[0];
    console.log(this.image)
}
}
