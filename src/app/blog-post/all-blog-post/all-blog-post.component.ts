import { Component, OnInit } from '@angular/core';
import { NotifService } from 'src/app/_services/notif.service';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { BlogPostService } from 'src/app/_services/blog-post.service';
import { BlogCategorie } from 'src/app/_models/blog-categories.model';
import { BlogPost } from 'src/app/_models/blog-posts.model';
import { User } from 'src/app/_models/user.model';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-all-blog-post',
  templateUrl: './all-blog-post.component.html',
  styleUrls: ['./all-blog-post.component.scss']
})
export class AllBlogPostComponent implements OnInit {

  listBlogCategories = [];
  listBlogCategories_tmp = [];
  listBlog_posts = [];
  UserPost: User;
  UserAuth: User;
  UserBlogPosts: User[] = [];
  panelOpenState = false;
  loading = true;
  @BlockUI() blockUI: NgBlockUI;

  // SweetAlert Text
  areYouSure = '';
  warning = '';
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  canCreate = false;

  constructor(
    private blogpostservice: BlogPostService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private authService: AuthService

  ) {

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'Article' })
      .subscribe(val => {
        this.areYouSure = val['SweetAlert.AreYouSure'];
        this.warning = val['SweetAlert.Warning'];
        this.yes = val['SweetAlert.Yes'];
        this.no = val['SweetAlert.No'];
        this.deleted = val['SweetAlert.Deleted'];
        this.deletedMessage = val['SweetAlert.DeletedMessage'];
        this.cancelled = val['SweetAlert.Cancelled'];
        this.cancelledMessage = val['SweetAlert.CancelledMessage'];
      });

    // recuperation de utilisateur authentifié
    this.UserAuth = this.authService.getUser();
  }


  ngOnInit() {
    this.canCreate = this.authService.hasPermission('create-blog-posts');
    this.getAllBlogPost();
    this.getallBlogCategories();
    // this.getAllPostWithCategorie(1);
    this.getUsersPost(1);
    this.getAllUsers();
  }

  // recuperation de la liste des categories
  getallBlogCategories() {
    // this.loading = true;
    this.blogpostservice.all_blog_categories().then(
      response => {
        this.listBlogCategories = response.data;
        console.log(this.listBlogCategories);
      }
    ).catch(

    ).finally(
      () => {
        // this.loading = false;
      }
    );
  }


  // recuperatio de tous les blogs post de la page
  getAllBlogPost() {
    this.blogpostservice.all_posts().then(
      response => {
        this.listBlog_posts = [];
        this.listBlog_posts = response;
        this.listBlogCategories_tmp = response;

      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        // this.loading = false;
      }
    );
  }
  // recuperation de utilisateur qui a commente un post donnee

  getAllUsers() {
    this.blogpostservice.allUser().then(
      response => {
        this.UserBlogPosts = response;
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        // this.loading = false;
      }
    );
  }
  getOneUserPost(user_id: number): User {
    const userblogPost: User = this.UserBlogPosts.find(
      (userObject) => {
        return userObject.id === user_id;
      }
    );

    return userblogPost;
  }

  getUsersPost(user_id: number) {
    this.blogpostservice.findUser(user_id).then(
      response => {
        this.UserPost = response;
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message);
      }
    ).finally(
      () => {
        // this.loading = false;
      }
    );
  }

  detailBlogPost(blog_post_id: number) {
    this.router.navigate(['/blog-posts/details/' + blog_post_id]);
  }
  // supprimer un post par celui qui a posté
  deleteBlogPost(blogPost: BlogPost) {
    Swal.fire({
      title: this.areYouSure,
      text: this.warning,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.yes,
      cancelButtonText: this.no
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Loading...');
        this.blogpostservice.deleteBlogPost(blogPost.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            this.getAllBlogPost();
          }
        ).catch(
          error => {
            console.log(error)
            this.blockUI.stop();
            this.translate.get('Role.' + error.error.code)
              .subscribe(val => this.notifService.danger(val));
          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          this.cancelled,
          this.cancelledMessage,
          'error'
        );
      }
    });
  }
  // changement de la categorie
  changeBlogCategorie(event) {
    const titleSelected = event.tab.textLabel;
    if(titleSelected=="tous") {
      this.getAllBlogPost();
    }
    else {
      const blogCategorie: BlogCategorie = this.getOneBlogCategorie(titleSelected);
      // this.getAllPostWithCategorie(blogCategorie.id)
    }

  }
  // recuperation d'un Blogcategorie
  getOneBlogCategorie(title: string) {
    const blogCat: BlogCategorie = this.listBlogCategories.find(
      (blogCatObject) => {
        return blogCatObject.title == title;
      }
    );
    return blogCat;
  }

  getPartOfcontent(content: string) {
    return content.substring(1, 250) + '...';
  }

  // function de rech erche d'un blog
  search(event) {
    this.listBlog_posts = this.listBlogCategories_tmp;
    this.listBlog_posts = this.listBlog_posts.filter( blogPost => blogPost.title.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}
