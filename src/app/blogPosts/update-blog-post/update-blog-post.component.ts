import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogPostService } from 'src/app/_services/blog-post.service';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { BlogCategoryService } from 'src/app/_services/blog-category.service';
import { BlogCategory } from 'src/app/_models/blog.category.model';
import { BlogPost } from 'src/app/_models/blog-post.model';


@Component({
  selector: 'app-update-blog-post',
  templateUrl: './update-blog-post.component.html',
  styleUrls: ['./update-blog-post.component.scss']
})
export class UpdateBlogPostComponent implements OnInit {

  user;
  blog;

  blog_categories: any[] = [];
  blog_categories_tmp: any[] = [];
  blogPost : BlogPost = new BlogPost();


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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
    this.initForm();
    this.getBlogCategories();
    const blog_post_id = +this.route.snapshot.paramMap.get("id");
    this.blogPostService.find(blog_post_id).then(
      data => {
        this.blogPost = data;
        this.initForm(true);
      }
    ).catch(
      error => {
        this.translate.get('License.'+error.error.code)
        .subscribe(val => this.notifService.danger(val));
       // this.router.navigate(['/roles/all'])
      }
    )

  }

  initForm(withBlog = false) {
    if(withBlog) {
      this.blogPostForm = this.formBuilder.group({
        user_id: [this.blogPost.user_id, [Validators.required]],
        blog_category_id: [this.blogPost.blog_category_id, [Validators.required]],
        title:[this.blogPost.title],
        content: [this.blogPost.content],
        image:[this.blogPost.image],
      });
    }else {
      this.blogPostForm = this.formBuilder.group({
        blog_category_id:['',Validators.required],
        title: ['',Validators.required],
        content:['',Validators.required],
        image: ['']
      });
    }
  }

  getBlogCategories() {
    this.blogCategoryService.all().then(
      response => {
        this.blog_categories = response.data;
        this.blog_categories_tmp = response.data;
      }
    ).catch(
      error => {
        this.notifService.danger("Une erreur s'est produite");
      }
    )
  }

  get form() {
    return this.blogPostForm.controls;
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
      this.blogPostService.update(formData, this.blogPost.id)
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
