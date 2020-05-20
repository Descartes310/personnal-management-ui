import { Component, OnInit } from '@angular/core';
import { BlogComment } from 'src/app/_models/blog_comment.model';
import { BlogPost } from 'src/app/_models/blog-posts.model';
import { NotifService } from 'src/app/_services/notif.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPostService } from 'src/app/_services/blog-post.service';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/_services/auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-blog-post',
  templateUrl: './detail-blog-post.component.html',
  styleUrls: ['./detail-blog-post.component.scss']
})
export class DetailBlogPostComponent implements OnInit {

  //les de tous les commentaires du blog
  listBlogComment: BlogComment[] = [];
  //recuperation du dit blog
  BlogPost: BlogPost;
  blog_post_id:number;
  userPost:User;
  UserComments:User[]=[];
  UserAuth:User;
  newCommentValue:string;

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
    private notifService: NotifService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private blogservice:BlogPostService,
    private authService:AuthService
  ) { 

    this.translate.get(
      ['SweetAlert.AreYouSure', 'SweetAlert.Warning', 'SweetAlert.Yes', 'SweetAlert.No', 'SweetAlert.Deleted',
        'SweetAlert.DeletedMessage', 'SweetAlert.Cancelled', 'SweetAlert.CancelledMessage'],
      { data: 'Commentaire' })
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
    //recuperation de utilisateur connecté
    this.UserAuth=this.authService.getUser();
    this.blog_post_id = +this.route.snapshot.paramMap.get("id");
    this.findPost(this.blog_post_id);
    this.getAllUsers()
  }
  //recuperation du post
  findPost(idpost:number){
    this.blogservice.find(idpost).then(
      response => {
        console.log(response.blog_post)
        this.BlogPost=response.blog_post;
        this.userPost=response.blog_post.user_post;
        this.listBlogComment=response.blog_post.bog_comments;
        console.log(this.listBlogComment)
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

  //recuperation de utilisateur qui a commente un post donnee 

  getAllUsers(){
    this.blogservice.allUser().then(
      response => {
        this.UserComments=response

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
  getOneUserComment(user_id:number):User{
    const usercomment:User=this.UserComments.find(
      (usercommentObject)=>{
        return usercommentObject.id===user_id;
      }
    )
    return usercomment;
  }
  
  addNewComment(blog_post_id:number){
    const blogComment=new BlogComment();
        blogComment.user_id=this.UserAuth.id;
        blogComment.blog_post_id=blog_post_id;
        blogComment.comment=this.newCommentValue;
        blogComment.created_at=new Date();
        this.listBlogComment.push(blogComment)
        this.newCommentValue="";
        this.blogservice.addComment(blogComment).then(

          response=>{
            this.translate.get('Role.SubmitSuccess')
            .subscribe(val => this.notifService.success(val));
          }
        ).catch(
          error => {
            this.notifService.danger(error.error.message)
          }
        )
  }

  //supprimer un post par celui qui a posté
  deleteBlogComment(blogComment: BlogComment) {
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
        this.blogservice.deleteBlogComment(blogComment.id).then(
          data => {
            this.blockUI.stop();
            Swal.fire(
              this.deleted,
              this.deletedMessage,
              'success'
            )
            //on enleve le commentaire du tableau
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
