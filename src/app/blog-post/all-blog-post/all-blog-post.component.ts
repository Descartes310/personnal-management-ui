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
  listBlog_posts = [];
  UserPost: User;
  UserAuth:User;
  UserBlogPosts:User[]=[];
  panelOpenState = false;
  loading: boolean = true;
  @BlockUI() blockUI: NgBlockUI;

  //SweetAlert Text
  areYouSure = '';
  warning = ''
  yes = '';
  no = '';
  deleted = '';
  deletedMessage = '';
  cancelled = '';
  cancelledMessage = '';
  constructor(
    private blogpostservice: BlogPostService,
    private notifService: NotifService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router,
    private authService:AuthService

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

      //recuperation de utilisateur authentifié
      this.UserAuth=this.authService.getUser();
  }


  ngOnInit() {
    this.getallBlogCategories();
    this.getAllPostWithCategorie(2);
   this.getUsersPost(1);
  
   this.getAllUsers();

   console.log("user::::")
   console.log(this.getOneUserPost(1))


  }

  //recuperation de la liste des categories
  getallBlogCategories() {
    //this.loading = true;
    this.blogpostservice.all_blog_categories().then(
      response => {
        this.listBlogCategories = response;
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        //this.loading = false;
      }
    )
  }
  //recuperation de tout les posts d'une categorie
  getAllPostWithCategorie(blog_categorie_id: number) {
    this.blogpostservice.allPostsWithCategorieId(blog_categorie_id).then(
      response => {
        this.listBlog_posts = [];
        this.listBlog_posts = response.blog_categorie.blog_posts;
        console.log(this.listBlog_posts)
        /*response.map( blog_cat => {
          console.log(blog_cat)
          this.listBlogCategories.push(new BlogCategorie(blog_cat));
          console.log(this.listBlogCategories)
        });*/

      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        //this.loading = false;
      }
    )
  }
  //recuperation de utilisateur
    //recuperation de utilisateur
  //recuperation de utilisateur qui a commente un post donnee 

  getAllUsers() {
    this.blogpostservice.allUser().then(
      response => {
        this.UserBlogPosts = response;
        console.log(this.UserBlogPosts)
      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        //this.loading = false;
      }
    )
  }
  getOneUserPost(user_id: number): User {
    console.log(this.UserBlogPosts)
    const userblogPost: User = this.UserBlogPosts.find(
      (userObject) => {
        return userObject.id === user_id;
      }
    )

    return userblogPost;
  }
  
  getUsersPost(user_id: number) {
    this.blogpostservice.findUser(user_id).then(
      response => {
        console.log(response)
        this.UserPost = response


      }
    ).catch(
      error => {
        this.notifService.danger(error.error.message)
      }
    ).finally(
      () => {
        //this.loading = false;
      }
    )
  }

  detailBlogPost(blog_post_id: number) {
    this.router.navigate(['/blog-posts/details/' + blog_post_id])
  }
  //supprimer un post par celui qui a posté
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
            this.getAllPostWithCategorie(2);
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
        )
      }
    })
  }
}